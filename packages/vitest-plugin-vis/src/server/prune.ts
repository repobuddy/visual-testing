import { readdir, readFile, rm, rmdir, stat } from 'node:fs/promises'
import { dirname, join, normalize, relative, resolve } from 'pathe'
import { BASELINE_DIR, SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { COMMON_FOLDERS } from '../shared/trim_common_folder.ts'
import { file } from './externals/file.ts'
import { getSnapshotSubpath } from './snapshot_path.ts'
import { CONDENSED_SEGMENT } from './snapshot_path_limits.ts'

/**
 * Baseline folder of one test file, as `prune` sees it.
 */
export type BaselineFolder = {
	/** Absolute path of the folder. */
	path: string
	/** Absolute path of the `__baselines__` folder that holds it. */
	baselineRoot: string
}

export type KeptFolder = BaselineFolder & { reason: string }

export type PruneRefusal = { reason: string; path: string }

export type PruneWarning = { message: string; path: string }

export type PrunePlan = {
	/** Baseline folders whose test file is gone. */
	orphans: BaselineFolder[]
	/** Folders that look orphaned but are kept, because they cannot be mapped to a test file. */
	kept: KeptFolder[]
	/** Problems that make the mapping unsafe. When there is one, nothing may be deleted. */
	refusals: PruneRefusal[]
	warnings: PruneWarning[]
}

/**
 * Name of a folder that holds the baselines of one test file.
 * The default snapshot subpath ends with the test file name, extension included.
 */
const TEST_FILE_NAME = /\.(?:[cm]?[jt]sx?|mdx|vue|svelte|astro|marko)$/

/**
 * Files that can hold `vis()` options, relative to a project root.
 */
const CONFIG_FILE_NAME = /^(?:vite|vitest)(?:\.[\w-]+)*\.[cm]?[jt]s$/
const STORYBOOK_DIR = '.storybook'
const STORYBOOK_FILE_NAME = /\.[cm]?[jt]sx?$/

const SKIP_DIRS = new Set(['node_modules', '.git'])

/**
 * Finds the baseline folders whose test file is gone, without running tests.
 *
 * It looks for `__vis__` folders under `cwd`.
 * The parent of each `__vis__` folder is taken as the project root,
 * and every `__baselines__` folder under `__vis__` is checked, for any platform (`linux`, `win32`, `local`, ...).
 *
 * A folder named like a test file (`button.spec.tsx`) is orphaned when no file in the project
 * maps to it with the default snapshot subpath (`trimCommonFolder`).
 * It refuses when the mapping cannot be trusted: a custom `snapshotSubpath` in a config file,
 * or a baseline root where no folder matches a test file.
 */
export async function planPrune(cwd: string): Promise<PrunePlan> {
	const plan: PrunePlan = { orphans: [], kept: [], refusals: [], warnings: [] }
	const root = normalize(resolve(cwd))

	for (const visDir of await findDirs(root, SNAPSHOT_ROOT_DIR)) {
		const projectRoot = dirname(visDir)
		await checkConfigs(plan, root, projectRoot)

		for (const baselineRoot of await findDirs(visDir, BASELINE_DIR)) {
			const result = { orphans: [] as BaselineFolder[], kept: [] as KeptFolder[], live: 0 }
			await walk(projectRoot, baselineRoot, baselineRoot, result)
			if (result.orphans.length > 0 && result.live === 0) {
				plan.refusals.push({
					path: baselineRoot,
					reason:
						'none of its folders matches a test file, so the folder-to-file mapping looks wrong (custom `snapshotSubpath`, `snapshotRootDir`, or project root)',
				})
			}
			plan.orphans.push(...result.orphans)
			plan.kept.push(...result.kept)
		}
	}
	return plan
}

/**
 * Lists the test files that map to a baseline subpath with the default `snapshotSubpath`.
 * It inverts `trimCommonFolder`, then keeps only the candidates that map back to `subpath`.
 */
export function getTestFileCandidates(subpath: string): string[] {
	const variants = new Set([subpath, subpath.replaceAll('__', '..')])
	const candidates = new Set<string>()
	for (const v of variants) {
		for (const prefix of ['', ...COMMON_FOLDERS]) {
			const candidate = prefix ? `${prefix}/${v}` : v
			if (getSnapshotSubpath(candidate, {}) === subpath) candidates.add(candidate)
		}
	}
	return [...candidates]
}

async function walk(
	projectRoot: string,
	baselineRoot: string,
	dir: string,
	result: { orphans: BaselineFolder[]; kept: KeptFolder[]; live: number },
) {
	const entries = await readdir(dir, { withFileTypes: true }).catch(() => [])
	for (const entry of entries) {
		if (!entry.isDirectory()) continue
		const path = join(dir, entry.name)
		const subpath = relative(baselineRoot, path)
		const kinds = await Promise.all(getTestFileCandidates(subpath).map((c) => kindOf(resolve(projectRoot, c))))
		if (kinds.includes('file')) {
			result.live += 1
			continue
		}
		// A folder in the project with this path may hold test files further down.
		if (kinds.includes('dir') || !TEST_FILE_NAME.test(entry.name)) {
			await walk(projectRoot, baselineRoot, path, result)
			continue
		}
		if (CONDENSED_SEGMENT.test(entry.name)) {
			result.kept.push({ path, baselineRoot, reason: 'shortened by `shortenLongSnapshotPaths`' })
			continue
		}
		result.orphans.push({ path, baselineRoot })
	}
}

async function kindOf(path: string): Promise<'file' | 'dir' | undefined> {
	const s = await stat(path).catch(() => undefined)
	if (!s) return undefined
	return s.isFile() ? 'file' : s.isDirectory() ? 'dir' : undefined
}

/**
 * Finds the folders named `name` under `dir`, but not inside one another.
 */
async function findDirs(dir: string, name: string): Promise<string[]> {
	const found = await file.glob(`**/${name}/`, {
		cwd: dir,
		absolute: true,
		dot: true,
		ignore: [...SKIP_DIRS].map((d) => `**/${d}/**`),
	})
	const dirs = found.map((d) => normalize(d)).sort()
	return dirs.filter((d) => !dirs.some((o) => o !== d && d.startsWith(`${o}/`)))
}

/**
 * Reads the config files of the project root and its parents up to `cwd`.
 * The options are functions or values that only exist when the config runs,
 * so this looks for their names in the text.
 */
async function checkConfigs(plan: PrunePlan, cwd: string, projectRoot: string) {
	const dirs: string[] = []
	for (let d = projectRoot; ; d = dirname(d)) {
		dirs.push(d)
		if (d === cwd || !d.startsWith(`${cwd}/`) || dirname(d) === d) break
	}
	for (const d of dirs) {
		for (const configFile of await listConfigFiles(d)) {
			const text = await readFile(configFile, 'utf8').catch(() => '')
			if (/\bsnapshotSubpath\b/.test(text)) {
				if (!plan.refusals.some((r) => r.path === configFile))
					plan.refusals.push({
						path: configFile,
						reason: 'it sets `snapshotSubpath`, so baseline folders cannot be mapped to test files',
					})
			}
			if (/\bshortenLongSnapshotPaths\b/.test(text)) {
				if (!plan.warnings.some((w) => w.path === configFile))
					plan.warnings.push({
						path: configFile,
						message: 'it sets `shortenLongSnapshotPaths`, so folders with shortened names are kept',
					})
			}
		}
	}
}

async function listConfigFiles(dir: string) {
	const entries = await readdir(dir, { withFileTypes: true }).catch(() => [])
	const files = entries.filter((e) => e.isFile() && CONFIG_FILE_NAME.test(e.name)).map((e) => join(dir, e.name))
	const sb = await readdir(join(dir, STORYBOOK_DIR), { withFileTypes: true }).catch(() => [])
	files.push(
		...sb.filter((e) => e.isFile() && STORYBOOK_FILE_NAME.test(e.name)).map((e) => join(dir, STORYBOOK_DIR, e.name)),
	)
	return files
}

/**
 * Deletes the folder, then each parent folder that is left empty, up to its `__baselines__` folder.
 */
export async function removeBaselineFolder(folder: BaselineFolder) {
	await rm(folder.path, { recursive: true, force: true })
	for (let dir = dirname(folder.path); dir.startsWith(`${folder.baselineRoot}/`); dir = dirname(dir)) {
		const entries = await readdir(dir).catch(() => undefined)
		if (!entries || entries.length > 0) return
		await rmdir(dir).catch(() => undefined)
	}
}
