import { resolve } from 'pathe'
import { describe, expect, it } from 'vitest'
import {
	formatCondensedSnapshotSubpath,
	getLegacySnapshotFilename,
	legacySnapshotPathExceedsLimit,
	resolveSnapshotSubpathWithinLimits,
	WIN_SNAPSHOT_PATH_BUDGET,
} from './snapshot_path_limits.ts'

describe(`${formatCondensedSnapshotSubpath.name}`, () => {
	it('is stable for the same raw subpath', () => {
		expect(formatCondensedSnapshotSubpath('client/foo.spec.tsx')).toBe(
			formatCondensedSnapshotSubpath('client/foo.spec.tsx'),
		)
		expect(formatCondensedSnapshotSubpath('client/foo.spec.tsx')).not.toBe(
			formatCondensedSnapshotSubpath('client/bar.spec.tsx'),
		)
	})

	it('normalizes backslashes', () => {
		expect(formatCondensedSnapshotSubpath(String.raw`client\foo.spec.tsx`)).toBe(
			formatCondensedSnapshotSubpath('client/foo.spec.tsx'),
		)
	})

	it('keeps directories and only shortens the basename with a tersify-style prefix', () => {
		const out = formatCondensedSnapshotSubpath('src/stories/Button.stories.ts')
		expect(out.startsWith('src/stories/Button-')).toBe(true)
		expect(out).toMatch(/^src\/stories\/Button-[a-f0-9]{12}\.ts$/)
		expect(out).not.toContain('Button.stories')
	})

	it('handles a file at subpath root', () => {
		const out = formatCondensedSnapshotSubpath('code.spec.ts')
		// `extname` is the last extension only (`.ts`); stem is `code.spec`, prefix `code`.
		expect(out).toMatch(/^code-[a-f0-9]{12}\.ts$/)
	})
})

describe(`${resolveSnapshotSubpathWithinLimits.name}`, () => {
	it('returns raw subpath when shortening is off', () => {
		const raw = `${'a'.repeat(300)}/x.spec.ts`
		expect(
			resolveSnapshotSubpathWithinLimits({
				snapshotBaselineRootAbs: '/proj/__vis__/local/__baselines__',
				rawSnapshotSubpath: raw,
				shortenLongSnapshotPaths: false,
			}),
		).toBe(raw)
	})

	it('returns raw subpath when probe path is under the limit', () => {
		expect(
			resolveSnapshotSubpathWithinLimits({
				snapshotBaselineRootAbs: '/p/snap/__baselines__',
				rawSnapshotSubpath: 'short/spec.tsx',
				shortenLongSnapshotPaths: true,
			}),
		).toBe('short/spec.tsx')
	})

	it('does not condense typical testcase layout + stories subpath (regression)', () => {
		const baselineRoot = '/home/unional/repobuddy/visual-testing/testcases/sb-csf-3/__vis__/local/__baselines__'
		const raw = 'src/stories/Button.stories.ts'
		expect(
			resolveSnapshotSubpathWithinLimits({
				snapshotBaselineRootAbs: baselineRoot,
				rawSnapshotSubpath: raw,
				shortenLongSnapshotPaths: true,
			}),
		).toBe(raw)
	})

	it('condenses when probe file path would exceed limit', () => {
		const longRoot = `/r/${'x'.repeat(WIN_SNAPSHOT_PATH_BUDGET)}`
		const raw = 'client/foo.spec.tsx'
		const out = resolveSnapshotSubpathWithinLimits({
			snapshotBaselineRootAbs: resolve(longRoot, '__baselines__'),
			rawSnapshotSubpath: raw,
			shortenLongSnapshotPaths: true,
		})
		expect(out).toBe(formatCondensedSnapshotSubpath(raw))
		expect(out).not.toBe(raw)
	})
})

describe(`${legacySnapshotPathExceedsLimit.name}`, () => {
	it('flags long paths', () => {
		expect(legacySnapshotPathExceedsLimit(`${'a'.repeat(WIN_SNAPSHOT_PATH_BUDGET)}/x.png`)).toBe(true)
	})
})

describe(`${getLegacySnapshotFilename.name}`, () => {
	it('uses explicit snapshot key', () => {
		expect(
			getLegacySnapshotFilename({
				taskId: 'suite/test',
				explicitSnapshotKey: 'k',
				defaultSnapshotKey: 'auto',
				taskCount: 2,
			}),
		).toBe('suite/test-k.png')
	})
})
