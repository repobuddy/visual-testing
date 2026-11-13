import { normalize, relative } from 'pathe'
import type { VisOptions } from '../config/types.ts'
import { toTaskIdSegment } from '../shared/task_id_segment.ts'

/**
 * What the run told the tracker about one project that set up a vis suite.
 */
export type TrackedProject = {
	projectRoot: string
	/** Absolute path of the project's `__baselines__` folder. */
	baselineRoot: string
	options: Pick<VisOptions, 'snapshotSubpath' | 'shortenLongSnapshotPaths'>
}

/**
 * Test file whose suite was set up in this run.
 */
export type TrackedModule = {
	projectName: string
	testPath: string
	/** Absolute path of the project's `__baselines__` folder. */
	baselineRoot: string
	/** Absolute path of the folder that holds this test file's baselines. */
	baselineDir: string
	shortenLongSnapshotPaths: boolean
}

/**
 * Records the baselines a run uses.
 *
 * It lives on `globalThis` because Vite bundles each Vitest config file on its own.
 * Each project config can get its own copy of this module,
 * but the reporter has to see the baselines of every project.
 */
export type SnapshotTracker = {
	/** Names of the projects that use the plugin, from `configureVitest`. */
	visProjects: Set<string>
	projects: Map<string, TrackedProject>
	modules: Map<string, TrackedModule>
	used: Set<string>
}

const TRACKER_KEY = Symbol.for('vitest-plugin-vis/snapshot-tracker')

export function getSnapshotTracker(): SnapshotTracker {
	const g = globalThis as unknown as Record<symbol, SnapshotTracker | undefined>
	g[TRACKER_KEY] ??= { visProjects: new Set(), projects: new Map(), modules: new Map(), used: new Set() }
	return g[TRACKER_KEY]
}

/** Clears what the last run recorded. `visProjects` comes from the config and stays. */
export function resetSnapshotTracker(tracker = getSnapshotTracker()) {
	tracker.projects.clear()
	tracker.modules.clear()
	tracker.used.clear()
}

/**
 * Key to compare paths with.
 * Windows paths are compared without case, as the file system does.
 */
export function pathKey(path: string, platform: string = process.platform) {
	const p = normalize(path)
	return platform === 'win32' ? p.toLowerCase() : p
}

export function moduleKey(projectName: string, testPath: string) {
	return `${projectName}\0${pathKey(testPath)}`
}

export function trackModule(
	tracker: SnapshotTracker,
	project: { name: string } & TrackedProject,
	module: TrackedModule,
) {
	const { name, ...rest } = project
	tracker.projects.set(name, rest)
	tracker.modules.set(moduleKey(module.projectName, module.testPath), module)
}

export function markUsed(tracker: SnapshotTracker, absolutePath: string) {
	tracker.used.add(pathKey(absolutePath))
}

/**
 * Test result as the reporter sees it, reduced to what the analysis needs.
 */
export type RunTest = {
	taskId: string
	/** `true` only when the test ran and passed. Skipped, todo, failed and pending tests are `false`. */
	passed: boolean
}

export type RunModule = {
	projectName: string
	moduleId: string
	/** `false` when the module has errors of its own, such as a failed import or `beforeAll`. */
	ok: boolean
	tests: RunTest[]
}

/**
 * Baseline root that the run covered in full, so baselines of test files that are gone can be flagged.
 */
export type FullRoot = {
	baselineRoot: string
	/** Absolute baseline folders of every test file of the projects that write to this root. */
	moduleDirs: string[]
}

export type FindObsoleteSnapshotsInput = {
	tracker: SnapshotTracker
	modules: RunModule[]
	fullRoots: FullRoot[]
	/** Lists the absolute paths of the `.png` files under `dir`, at any depth. */
	listFiles(dir: string): Promise<string[]>
	platform?: string | undefined
}

/**
 * Pattern of a file name that `shortenLongSnapshotPaths` condensed.
 * Such a name no longer starts with its task ID.
 */
const CONDENSED_FILENAME = /-[0-9a-f]{12}\.png$/

/**
 * Finds the baselines that the run did not use.
 *
 * It errs on the side of keeping a file:
 * - Only test files that ran are checked, and only in their own baseline folder.
 * - Snapshots of tests that did not pass (skipped, todo, failed) are kept.
 * - Test files with errors of their own are skipped.
 * - Baselines of test files that are gone are flagged only under the roots in `fullRoots`.
 */
export async function findObsoleteSnapshots(input: FindObsoleteSnapshotsInput): Promise<string[]> {
	const { tracker, platform = process.platform } = input
	const key = (p: string) => pathKey(p, platform)
	const isInside = (file: string, dir: string) => {
		const d = key(dir)
		return key(file).startsWith(d.endsWith('/') ? d : `${d}/`)
	}
	const obsolete = new Map<string, string>()
	const runModules = new Map(input.modules.map((m) => [moduleKey(m.projectName, m.moduleId), m]))
	const trackedModules = [...tracker.modules.values()]

	for (const [k, tracked] of tracker.modules) {
		const run = runModules.get(k)
		if (!run?.ok) continue
		const protectedPrefixes = run.tests.filter((t) => !t.passed).map((t) => `${t.taskId}-`)
		const nestedDirs = trackedModules
			.filter((m) => m !== tracked && isInside(m.baselineDir, tracked.baselineDir))
			.map((m) => m.baselineDir)
		for (const file of await input.listFiles(tracked.baselineDir)) {
			if (tracker.used.has(key(file))) continue
			if (nestedDirs.some((d) => isInside(file, d))) continue
			const rel = relative(tracked.baselineDir, file)
			if (protectedPrefixes.some((p) => rel.startsWith(p))) continue
			if (tracked.shortenLongSnapshotPaths && CONDENSED_FILENAME.test(rel)) continue
			obsolete.set(key(file), normalize(file))
		}
	}

	for (const root of input.fullRoots) {
		for (const file of await input.listFiles(root.baselineRoot)) {
			if (tracker.used.has(key(file))) continue
			if (root.moduleDirs.some((d) => isInside(file, d))) continue
			obsolete.set(key(file), normalize(file))
		}
	}

	return [...obsolete.values()].sort()
}

/**
 * Computes the task ID of a test from its name and the names of its suites.
 * It matches `toTaskId` on the client.
 */
export function toReportedTaskId(test: { name: string; parent: { type: string; name?: string; parent?: any } }) {
	const l: string[] = [toTaskIdSegment(test.name)]
	let p = test.parent
	while (p && p.type === 'suite') {
		l.unshift(toTaskIdSegment(p.name!))
		p = p.parent
	}
	return l.join('/')
}
