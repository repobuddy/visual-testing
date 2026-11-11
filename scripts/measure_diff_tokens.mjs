// Measure how many vision tokens an agent spends reviewing a failed image snapshot,
// comparing: Expected + Actual, the Difference image alone, and the review image.
//
// Usage: node scripts/measure_diff_tokens.mjs . <out-dir>
//
// Image pairs come from the repo's own git data:
// - cross-platform: the linux and win32 baselines of the same test (rendering drift)
// - modified: baselines modified in place (15bbb3ac)
//
// The diff, the changed regions, the skip rules, and the review image come from the
// vitest-plugin-vis source, so the numbers follow the plugin's output.
// Both images are padded to the larger size first, as the plugin does.
//
// Token rule (https://platform.claude.com/docs/en/build-with-claude/vision):
// ceil(w/28) * ceil(h/28), after downscaling to fit the tier's long edge and token cap.

import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const [repoRoot, outDir] = process.argv.slice(2).map((p) => resolve(p))
if (!repoRoot || !outDir) throw new Error('usage: measure_diff_tokens.mjs <repo-root> <out-dir>')

const pluginRoot = join(repoRoot, 'packages/vitest-plugin-vis')
const require = createRequire(join(pluginRoot, 'package.json'))
const { PNG } = require('pngjs')
const importPlugin = (file) => import(pathToFileURL(join(pluginRoot, 'src/shared', file)).href)
const { compareImage, getChangedMask } = await importPlugin('compare_image.ts')
const { findChangedRegions } = await importPlugin('changed_regions.ts')
const { createReviewImage, getReviewImageSkipReason } = await importPlugin('review_image.ts')

const TIERS = {
	high: { maxEdge: 2576, maxTokens: 4784 }, // Claude 4.7 and later
	standard: { maxEdge: 1568, maxTokens: 1568 },
}
/** The browser viewport width of the full-page snapshots in this repository. */
const PAGE_WIDTH = 1280

const git = (...args) =>
	execFileSync('git', ['-C', repoRoot, ...args], { maxBuffer: 1 << 30, stdio: ['ignore', 'pipe', 'ignore'] })
const blob = (rev, path) => PNG.sync.read(git('show', `${rev}:${path}`))
const lines = (buf) => buf.toString().split('\n').filter(Boolean)

function countTokens(w, h) {
	return Math.ceil(w / 28) * Math.ceil(h / 28)
}
function roundTiesToEven(v) {
	const f = Math.floor(v)
	if (v - f !== 0.5) return Math.round(v)
	return f % 2 === 0 ? f : f + 1
}
function resizedSize(w, h, { maxEdge, maxTokens }) {
	const fits = (a, b) =>
		Math.ceil(a / 28) * 28 <= maxEdge && Math.ceil(b / 28) * 28 <= maxEdge && countTokens(a, b) <= maxTokens
	if (fits(w, h)) return [w, h]
	if (h > w) {
		const [rh, rw] = resizedSize(h, w, { maxEdge, maxTokens })
		return [rw, rh]
	}
	const ar = w / h
	let lo = 1
	let hi = w
	while (lo + 1 < hi) {
		const mid = Math.floor((lo + hi) / 2)
		if (fits(mid, Math.max(roundTiesToEven(mid / ar), 1))) lo = mid
		else hi = mid
	}
	return [lo, Math.max(roundTiesToEven(lo / ar), 1)]
}
function imageTokens(w, h, tier) {
	const [rw, rh] = resizedSize(w, h, tier)
	return countTokens(rw, rh)
}

// Same as vitest-plugin-vis createImageResizer: pad, do not scale.
function pad(img, width, height) {
	if (img.width === width && img.height === height) return img
	const out = new PNG({ width, height })
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const i = (width * y + x) << 2
			if (x < img.width && y < img.height) {
				const o = (img.width * y + x) << 2
				out.data[i] = img.data[o]
				out.data[i + 1] = img.data[o + 1]
				out.data[i + 2] = img.data[o + 2]
				out.data[i + 3] = img.data[o + 3]
			} else {
				out.data[i + 3] = 64
			}
		}
	}
	return out
}
function toPng({ data, width, height }) {
	const png = new PNG({ width, height })
	png.data = Buffer.from(data.buffer, data.byteOffset, data.byteLength)
	return PNG.sync.write(png)
}

function groupOf(baseline, result) {
	if (baseline.width !== result.width || baseline.height !== result.height) return 'sizeChanged'
	return baseline.width >= PAGE_WIDTH ? 'fullPage' : 'component'
}

function measure(name, baseline, result) {
	const width = Math.max(baseline.width, result.width)
	const height = Math.max(baseline.height, result.height)
	const a = pad(baseline, width, height)
	const b = pad(result, width, height)
	const diff = new PNG({ width, height })
	const { pass, diffAmount } = compareImage(a.data, b.data, diff.data, width, height)
	if (pass) return undefined

	const mask = getChangedMask(a.data, b.data, diff.data, width, height)
	const regions = findChangedRegions(mask, width, height)
	const skipReason = getReviewImageSkipReason({ baseline, result, regions })
	const review = skipReason ? undefined : createReviewImage(a, b, mask, regions)

	const dir = join(outDir, 'images', name)
	mkdirSync(dir, { recursive: true })
	writeFileSync(join(dir, 'baseline.png'), PNG.sync.write(baseline))
	writeFileSync(join(dir, 'result.png'), PNG.sync.write(result))
	writeFileSync(join(dir, 'diff.png'), PNG.sync.write(diff))
	writeFileSync(join(dir, 'regions.json'), JSON.stringify({ width, height, regions }))
	if (review) writeFileSync(join(dir, 'review.png'), toPng(review))

	const tokens = {}
	for (const [tier, limits] of Object.entries(TIERS)) {
		const actual = imageTokens(result.width, result.height, limits)
		const diffTokens = imageTokens(width, height, limits)
		const reviewTokens = review ? imageTokens(review.width, review.height, limits) : undefined
		// What this page tells the agent to open: the review image,
		// or, when it is skipped, the Actual image if the size changed and the Difference image otherwise.
		const fallback = baseline.width !== result.width || baseline.height !== result.height ? actual : diffTokens
		tokens[tier] = {
			expectedAndActual: imageTokens(baseline.width, baseline.height, limits) + actual,
			difference: diffTokens,
			review: reviewTokens,
			followPage: reviewTokens ?? fallback,
		}
	}
	return {
		name,
		group: groupOf(baseline, result),
		baseline: [baseline.width, baseline.height],
		result: [result.width, result.height],
		diffPixels: diffAmount,
		regions,
		skipReason,
		review: review ? [review.width, review.height] : undefined,
		tokens,
	}
}

function collectPairs() {
	const pairs = []
	const files = lines(git('ls-files', '*__vis__/linux/__baselines__/*.png'))
	for (const linux of files) {
		const win = linux.replace('/__vis__/linux/', '/__vis__/win32/')
		try {
			git('cat-file', '-e', `HEAD:${win}`)
		} catch {
			continue
		}
		pairs.push({ source: 'cross-platform', base: ['HEAD', linux], next: ['HEAD', win] })
	}
	for (const path of lines(git('diff-tree', '--no-commit-id', '-r', '--name-only', '--diff-filter=M', '15bbb3ac'))) {
		if (!path.endsWith('.png')) continue
		pairs.push({ source: 'modified', base: ['15bbb3ac^', path], next: ['15bbb3ac', path] })
	}
	return pairs
}

const median = (xs) => {
	const s = [...xs].sort((a, b) => a - b)
	const m = s.length >> 1
	return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

const rows = []
const counts = {}
for (const [i, p] of collectPairs().entries()) {
	counts[p.source] ??= { pairs: 0, identical: 0 }
	counts[p.source].pairs++
	const name = `${p.source}/${String(i).padStart(3, '0')}-${p.base[1]
		.split('/')
		.slice(-2)
		.join('__')
		.replace(/\.png$/, '')}`
	const row = measure(name, blob(...p.base), blob(...p.next))
	if (!row) {
		counts[p.source].identical++
		continue
	}
	rows.push({ source: p.source, path: p.base[1], ...row })
}

const KEYS = ['expectedAndActual', 'difference', 'review', 'followPage']
const summary = {}
for (const group of ['fullPage', 'component', 'sizeChanged', 'all']) {
	const rs = group === 'all' ? rows : rows.filter((r) => r.group === group)
	const skipped = {}
	for (const r of rs) {
		if (!r.skipReason) continue
		const reason = r.skipReason.replace(/\d+/g, 'N')
		skipped[reason] = (skipped[reason] ?? 0) + 1
	}
	summary[group] = { mismatches: rs.length, reviewImages: rs.filter((r) => r.review).length, skipped }
	for (const tier of Object.keys(TIERS)) {
		summary[group][tier] = Object.fromEntries(
			KEYS.map((k) => {
				const values = rs.map((r) => r.tokens[tier][k]).filter((v) => v !== undefined)
				return [k, { total: values.reduce((n, v) => n + v, 0), median: values.length ? median(values) : null }]
			}),
		)
		// The pair and the diff, over the comparisons that got a review image, to compare like with like.
		const withReview = rs.filter((r) => r.review)
		summary[group][tier].withReview = Object.fromEntries(
			['expectedAndActual', 'difference', 'review'].map((k) => [
				k,
				withReview.reduce((n, r) => n + r.tokens[tier][k], 0),
			]),
		)
	}
	summary[group].medianRegions = median(rs.map((r) => r.regions.length))
}

mkdirSync(outDir, { recursive: true })
writeFileSync(join(outDir, 'results.json'), JSON.stringify({ counts, summary, rows }, null, '\t'))
process.stdout.write(`${JSON.stringify({ counts, summary }, null, 2)}\n`)
