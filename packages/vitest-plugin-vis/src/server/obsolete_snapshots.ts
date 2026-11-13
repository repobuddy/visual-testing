import { readdir, rm, rmdir } from 'node:fs/promises'
import { dirname, join, normalize, relative } from 'pathe'
import type { TestModule, TestSpecification, Vitest } from 'vitest/node'
import { file } from './externals/file.ts'
import {
	type FullRoot,
	findObsoleteSnapshots,
	getSnapshotTracker,
	moduleKey,
	pathKey,
	type RunModule,
	resetSnapshotTracker,
	type SnapshotTracker,
	toReportedTaskId,
} from './obsolete_snapshots.logic.ts'
import { getTaskSubpath } from './suite.ts'
import type { VisSuite } from './vis_server_context.types.ts'

type Logger = { log(...args: unknown[]): void }

export type ObsoleteSnapshotsReporterOptions = {
	vitest: Pick<Vitest, 'config' | 'projects' | 'globTestSpecifications'> & {
		logger: Logger
		snapshot: { options: { updateSnapshot: string } }
	}
	tracker?: SnapshotTracker | undefined
	listFiles?: ((dir: string) => Promise<string[]>) | undefined
	removeFile?: ((path: string, tracker: SnapshotTracker) => Promise<void>) | undefined
}

/**
 * Vitest reporter that lists the baselines the run did not use, and deletes them with `-u`.
 */
export function createObsoleteSnapshotsReporter({
	vitest,
	tracker = getSnapshotTracker(),
	listFiles = listPngFiles,
	removeFile = removeFileAndEmptyParents,
}: ObsoleteSnapshotsReporterOptions) {
	let runSpecs: ReadonlyArray<Pick<TestSpecification, 'moduleId' | 'project'>> = []
	return {
		onTestRunStart(specifications: ReadonlyArray<Pick<TestSpecification, 'moduleId' | 'project'>>) {
			runSpecs = specifications
			resetSnapshotTracker(tracker)
		},
		async onTestRunEnd(
			testModules: ReadonlyArray<TestModule>,
			unhandledErrors: ReadonlyArray<unknown>,
			reason: 'passed' | 'interrupted' | 'failed',
		) {
			// An interrupted run or an unhandled error can stop tests before they take their snapshots.
			if (reason === 'interrupted' || unhandledErrors.length > 0) return
			if (tracker.modules.size === 0) return

			const modules = testModules.map(toRunModule)
			const fullRoots = await getFullRoots(vitest, tracker, runSpecs)
			const obsolete = await findObsoleteSnapshots({ tracker, modules, fullRoots, listFiles })
			if (obsolete.length === 0) return

			const root = vitest.config.root
			const update = vitest.snapshot.options.updateSnapshot === 'all'
			if (update) {
				for (const f of obsolete) await removeFile(f, tracker)
			}
			vitest.logger.log(formatReport(obsolete, root, update))
		},
	}
}

const REGISTERED_KEY = Symbol.for('vitest-plugin-vis/obsolete-snapshots-reporter')

/**
 * Adds the reporter to the Vitest instance, once.
 *
 * `configureVitest` runs for each project before Vitest creates its reporters,
 * so appending to `config.reporters` keeps the reporters the user configured.
 */
export function registerObsoleteSnapshotsReporter(
	vitest: Vitest,
	project: { name: string },
	tracker: SnapshotTracker = getSnapshotTracker(),
) {
	tracker.visProjects.add(project.name)
	const g = globalThis as unknown as Record<symbol, WeakSet<object> | undefined>
	const registered = (g[REGISTERED_KEY] ??= new WeakSet())
	if (registered.has(vitest.config)) return
	registered.add(vitest.config)
	vitest.config.reporters.push(createObsoleteSnapshotsReporter({ vitest: vitest as any, tracker }) as any)
}

export function formatReport(files: string[], root: string, removed: boolean) {
	const n = files.length
	const title = removed
		? `${n} obsolete image ${n === 1 ? 'snapshot' : 'snapshots'} removed`
		: `${n} obsolete image ${n === 1 ? 'snapshot' : 'snapshots'} found. Run with -u to remove ${n === 1 ? 'it' : 'them'}.`
	return [` vis  ${title}`, ...files.map((f) => `   ↳ ${relative(root, f)}`), ''].join('\n')
}

function toRunModule(m: TestModule): RunModule {
	const tests = [...m.children.allTests()].map((t) => ({
		taskId: toReportedTaskId(t as any),
		passed: t.result().state === 'passed',
	}))
	return {
		projectName: m.project.name,
		moduleId: m.moduleId,
		ok: m.errors().length === 0 && (m.state() === 'passed' || m.state() === 'failed'),
		tests,
	}
}

/**
 * A baseline root is swept for baselines of test files that are gone only when the run covered it in full:
 * the run is not filtered by project, every project that uses the plugin reported its root,
 * and every test file of the projects that write to the root ran.
 */
export async function getFullRoots(
	vitest: Pick<Vitest, 'config' | 'projects' | 'globTestSpecifications'>,
	tracker: SnapshotTracker,
	runSpecs: ReadonlyArray<Pick<TestSpecification, 'moduleId' | 'project'>>,
): Promise<FullRoot[]> {
	if ((vitest.config.project ?? []).length > 0) return []
	for (const project of vitest.projects) {
		if (!project.config.browser?.enabled) continue
		if (tracker.visProjects.has(project.name) && !tracker.projects.has(project.name)) return []
	}

	const ran = new Set(runSpecs.map((s) => moduleKey(s.project.name, s.moduleId)))
	const allSpecs = await vitest.globTestSpecifications()

	const projectsByRoot = new Map<string, string[]>()
	for (const [name, p] of tracker.projects) {
		const k = pathKey(p.baselineRoot)
		projectsByRoot.set(k, [...(projectsByRoot.get(k) ?? []), name])
	}

	const fullRoots: FullRoot[] = []
	for (const names of projectsByRoot.values()) {
		const specs = allSpecs.filter((s) => names.includes(s.project.name))
		if (specs.some((s) => !ran.has(moduleKey(s.project.name, s.moduleId)))) continue
		const moduleDirs = specs.map((s) => {
			const p = tracker.projects.get(s.project.name)!
			const state = { projectRoot: p.projectRoot, snapshotBaselineDir: p.baselineRoot } as VisSuite
			return join(p.baselineRoot, getTaskSubpath(state, s.moduleId, p.options))
		})
		fullRoots.push({ baselineRoot: tracker.projects.get(names[0]!)!.baselineRoot, moduleDirs })
	}
	return fullRoots
}

async function listPngFiles(dir: string) {
	const files = await file.glob('**/*.png', { cwd: dir, absolute: true, nodir: true })
	return files.map((f) => normalize(f))
}

/**
 * Removes the file, then each parent folder that is left empty, up to the baseline root.
 */
async function removeFileAndEmptyParents(path: string, tracker: SnapshotTracker) {
	await rm(path, { force: true })
	const roots = [...tracker.projects.values()].map((p) => pathKey(p.baselineRoot))
	let dir = dirname(path)
	while (roots.some((r) => pathKey(dir).startsWith(`${r}/`))) {
		const entries = await readdir(dir).catch(() => undefined)
		if (!entries || entries.length > 0) return
		await rmdir(dir).catch(() => undefined)
		dir = dirname(dir)
	}
}
