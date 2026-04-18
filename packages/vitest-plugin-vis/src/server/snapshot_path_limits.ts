import { createHash } from 'node:crypto'
import { basename, dirname, extname, join, resolve } from 'pathe'

/** Classic Win32 `MAX_PATH` includes NUL; tools often treat ~259 as usable. */
export const WIN_MAX_PATH = 260

/**
 * Budget under {@link WIN_MAX_PATH} to leave margin for tooling and long `projectRoot` prefixes.
 */
export const WIN_SNAPSHOT_PATH_BUDGET = 250

/** NTFS maximum length of a single path component (directory or file name). */
export const NTFS_MAX_FILENAME = 255

/** Max length of the readable prefix taken from the original basename (tersify-style). */
const SNAPSHOT_SUBPATH_PREFIX_MAX_LEN = 8

/**
 * Minimal probe file under the snapshot folder — detects when the directory prefix alone is too long.
 */
const SNAPSHOT_SUBPATH_PROBE_MIN_BASENAME = '0.png'

export function absoluteSnapshotFilePath(projectRoot: string, baselineDir: string, snapshotFilename: string): string {
	return resolve(projectRoot, join(baselineDir, snapshotFilename))
}

/**
 * @returns true when the legacy absolute path should be shortened for Windows-safe tooling.
 */
export function legacySnapshotPathExceedsLimit(absolutePath: string): boolean {
	if (absolutePath.length >= WIN_SNAPSHOT_PATH_BUDGET) return true
	if (basename(absolutePath).length > NTFS_MAX_FILENAME) return true
	return false
}

/**
 * First readable token of a snapshot basename stem (before the first `.`), similar in spirit to
 * [tersify](https://github.com/unional/tersify) terse labels — keeps a short human hint, not the whole name.
 */
function snapshotBasenameTersifyPrefix(stem: string): string {
	if (!stem) return 'snap'
	const dot = stem.indexOf('.')
	const first = dot === -1 ? stem : stem.slice(0, dot)
	const cleaned = first.replace(/[^\w-]/g, '')
	return (cleaned || 'snap').slice(0, SNAPSHOT_SUBPATH_PREFIX_MAX_LEN)
}

/**
 * Keeps all directory segments of {@link rawSnapshotSubpath}; only the final filename is replaced with
 * `{prefix}-{hash12}{ext}` where `prefix` comes from the first segment of the original stem (e.g. `Button.stories.ts` → `Button`).
 */
export function formatCondensedSnapshotSubpath(rawSnapshotSubpath: string): string {
	const norm = rawSnapshotSubpath.replace(/\\/g, '/')
	const dir = dirname(norm)
	const file = basename(norm)
	const ext = extname(file)
	const stem = ext ? file.slice(0, -ext.length) : file
	const prefix = snapshotBasenameTersifyPrefix(stem)
	const h = createHash('sha256').update(norm).digest('hex').slice(0, 12)
	const shortFile = `${prefix}-${h}${ext}`
	if (dir === '.' || dir === '') return shortFile
	return join(dir, shortFile)
}

/**
 * `snapshotBaselineRootAbs` is the absolute `__baselines__` root; with `rawSnapshotSubpath` this yields the
 * test-module snapshot directory. Only checks whether that layout can host a tiny baseline file; long
 * `taskId-key.png` paths are handled with {@link resolveLegacySnapshotFileRelativePath} using real names.
 */
function rawSnapshotSubpathExceedsSafePathBudget(snapshotBaselineRootAbs: string, rawSnapshotSubpath: string): boolean {
	const dirAbs = resolve(snapshotBaselineRootAbs, rawSnapshotSubpath)

	if (legacySnapshotPathExceedsLimit(resolve(dirAbs, SNAPSHOT_SUBPATH_PROBE_MIN_BASENAME))) return true

	for (const segment of rawSnapshotSubpath.split(/[/\\]/)) {
		if (segment.length > NTFS_MAX_FILENAME) return true
	}

	return false
}

/**
 * Returns {@link rawSnapshotSubpath} or a tersified final segment when `shortenLongSnapshotPaths` is on and
 * `snapshotBaselineRootAbs` + subpath + a minimal `0.png` would exceed {@link legacySnapshotPathExceedsLimit},
 * or a subpath segment exceeds NTFS length. Long snapshot **filenames** (`taskId-key.png`) are shortened
 * separately via {@link resolveLegacySnapshotFileRelativePath}. Baseline, result, and diff trees share the
 * same resolved subpath via {@link getTaskSubpath}.
 */
export function resolveSnapshotSubpathWithinLimits(params: {
	snapshotBaselineRootAbs: string
	rawSnapshotSubpath: string
	shortenLongSnapshotPaths: boolean
}): string {
	const { snapshotBaselineRootAbs, rawSnapshotSubpath, shortenLongSnapshotPaths } = params
	if (!shortenLongSnapshotPaths) return rawSnapshotSubpath

	if (!rawSnapshotSubpathExceedsSafePathBudget(snapshotBaselineRootAbs, rawSnapshotSubpath)) {
		return rawSnapshotSubpath
	}

	return formatCondensedSnapshotSubpath(rawSnapshotSubpath)
}

/**
 * When `shortenLongSnapshotPaths` is on and the legacy `{@link getLegacySnapshotFilename}` path exceeds
 * {@link legacySnapshotPathExceedsLimit}, rewrites only the final path segment (after the last `/`) like
 * {@link formatCondensedSnapshotSubpath}, so nested `taskId` directories stay intact and `…-*.png` globs keep working.
 */
export function resolveLegacySnapshotFileRelativePath(params: {
	projectRoot: string
	baselineDir: string
	legacySnapshotFilename: string
	shortenLongSnapshotPaths: boolean
}): string {
	const { projectRoot, baselineDir, legacySnapshotFilename, shortenLongSnapshotPaths } = params
	if (!shortenLongSnapshotPaths) return legacySnapshotFilename

	const norm = legacySnapshotFilename.replace(/\\/g, '/')
	const abs = absoluteSnapshotFilePath(projectRoot, baselineDir, norm)
	if (!legacySnapshotPathExceedsLimit(abs)) return legacySnapshotFilename

	return formatCondensedSnapshotSubpath(norm)
}

export function getLegacySnapshotFilename(params: {
	taskId: string
	explicitSnapshotKey: string | undefined
	defaultSnapshotKey: string | undefined
	taskCount: number
}): string {
	const key =
		params.explicitSnapshotKey ??
		(typeof params.defaultSnapshotKey === 'string' ? params.defaultSnapshotKey : String(params.taskCount))
	return `${params.taskId}-${key}.png`
}
