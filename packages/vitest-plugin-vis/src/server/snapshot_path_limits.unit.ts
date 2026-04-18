import { resolve } from 'pathe'
import { describe, expect, it } from 'vitest'
import {
	formatCondensedSnapshotSubpath,
	getLegacySnapshotFilename,
	legacySnapshotPathExceedsLimit,
	resolveLegacySnapshotFileRelativePath,
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

	it('shortens multi-dot basenames with a capped prefix so .spec.* names shrink on Windows', () => {
		const out = formatCondensedSnapshotSubpath('client/vis_auto_snapshot_create_missing_baseline.spec.tsx')
		expect(out).toMatch(/^client\/vis_auto-[a-f0-9]{12}\.tsx$/)
		expect(out.length).toBeLessThan('client/vis_auto_snapshot_create_missing_baseline.spec.tsx'.length)
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

	it('shortens legacy taskId-key path using actual names when absolute path exceeds limit (Windows CI)', () => {
		const projectRoot = String.raw`D:\a\visual-testing\visual-testing\packages\storybook-addon-vis`
		const baselineDir = String.raw`__vis__\win32\__baselines__\client\vis_auto_snapshot_create_missing_baseline.spec.tsx`
		const legacy =
			'auto-snapshot-with-createmissingbaseline/writes-baseline-when-missing-if-creatematcher-runs-under-updatesnapshot-all-create_missing_baseline_sav_auto_theme.png'
		expect(legacySnapshotPathExceedsLimit(resolve(projectRoot, baselineDir, legacy))).toBe(true)
		const out = resolveLegacySnapshotFileRelativePath({
			projectRoot,
			baselineDir,
			legacySnapshotFilename: legacy,
			shortenLongSnapshotPaths: true,
		})
		expect(out).not.toBe(legacy)
		expect(out.startsWith('auto-snapshot-with-createmissingbaseline/')).toBe(true)
		expect(out).toMatch(/^auto-snapshot-with-createmissingbaseline\/writes-b-[a-f0-9]{12}\.png$/)
		expect(legacySnapshotPathExceedsLimit(resolve(projectRoot, baselineDir, out))).toBe(false)
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
