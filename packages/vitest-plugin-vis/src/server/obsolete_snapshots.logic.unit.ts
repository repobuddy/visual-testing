import { describe, expect, it } from 'vitest'
import { toTaskId } from '../client/task/task_id.ts'
import {
	findObsoleteSnapshots,
	getSnapshotTracker,
	markUsed,
	pathKey,
	type RunModule,
	resetSnapshotTracker,
	type SnapshotTracker,
	toReportedTaskId,
	trackModule,
} from './obsolete_snapshots.logic.ts'

const root = '/repo/__vis__/linux/__baselines__'

function createTracker(): SnapshotTracker {
	return { visProjects: new Set(), projects: new Map(), modules: new Map(), used: new Set() }
}

function track(tracker: SnapshotTracker, testPath: string, subpath: string, shortenLongSnapshotPaths = false) {
	trackModule(
		tracker,
		{ name: 'p', projectRoot: '/repo', baselineRoot: root, options: {} },
		{ projectName: 'p', testPath, baselineRoot: root, baselineDir: `${root}/${subpath}`, shortenLongSnapshotPaths },
	)
}

function runModule(moduleId: string, tests: RunModule['tests'], ok = true): RunModule {
	return { projectName: 'p', moduleId, ok, tests }
}

function fakeFs(files: string[]) {
	return async (dir: string) => files.filter((f) => f.startsWith(`${dir}/`))
}

describe(findObsoleteSnapshots.name, () => {
	it('flags the baselines of a test file in the run that the run did not use', async () => {
		const tracker = createTracker()
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		markUsed(tracker, `${root}/a.spec.ts/one-1.png`)
		const result = await findObsoleteSnapshots({
			tracker,
			modules: [runModule('/repo/src/a.spec.ts', [{ taskId: 'one', passed: true }])],
			fullRoots: [],
			listFiles: fakeFs([`${root}/a.spec.ts/one-1.png`, `${root}/a.spec.ts/one-2.png`, `${root}/a.spec.ts/gone-1.png`]),
		})
		expect(result).toEqual([`${root}/a.spec.ts/gone-1.png`, `${root}/a.spec.ts/one-2.png`])
	})

	it('keeps the snapshots of tests that did not pass (skipped, todo, failed)', async () => {
		const tracker = createTracker()
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		const result = await findObsoleteSnapshots({
			tracker,
			modules: [
				runModule('/repo/src/a.spec.ts', [
					{ taskId: 'skipped', passed: false },
					{ taskId: 'group/failed', passed: false },
					{ taskId: 'passed', passed: true },
				]),
			],
			fullRoots: [],
			listFiles: fakeFs([
				`${root}/a.spec.ts/skipped-1.png`,
				`${root}/a.spec.ts/group/failed-key.png`,
				`${root}/a.spec.ts/passed-1.png`,
			]),
		})
		expect(result).toEqual([`${root}/a.spec.ts/passed-1.png`])
	})

	it('keeps every baseline of a test file with errors of its own', async () => {
		const tracker = createTracker()
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		const result = await findObsoleteSnapshots({
			tracker,
			modules: [runModule('/repo/src/a.spec.ts', [{ taskId: 'one', passed: true }], false)],
			fullRoots: [],
			listFiles: fakeFs([`${root}/a.spec.ts/one-1.png`]),
		})
		expect(result).toEqual([])
	})

	it('keeps the baselines of test files outside the run', async () => {
		const tracker = createTracker()
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		const result = await findObsoleteSnapshots({
			tracker,
			modules: [runModule('/repo/src/b.spec.ts', [])],
			fullRoots: [],
			listFiles: fakeFs([`${root}/a.spec.ts/one-1.png`, `${root}/b.spec.ts/one-1.png`]),
		})
		expect(result).toEqual([])
	})

	it('keeps the baselines of another test file whose folder is inside this one', async () => {
		const tracker = createTracker()
		track(tracker, '/repo/src/a.spec.ts', 'a')
		track(tracker, '/repo/src/a/b.spec.ts', 'a/b')
		const result = await findObsoleteSnapshots({
			tracker,
			modules: [runModule('/repo/src/a.spec.ts', [])],
			fullRoots: [],
			listFiles: fakeFs([`${root}/a/one-1.png`, `${root}/a/b/one-1.png`]),
		})
		expect(result).toEqual([`${root}/a/one-1.png`])
	})

	it('keeps condensed file names when shortenLongSnapshotPaths is on, as they cannot be matched to a test', async () => {
		const tracker = createTracker()
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts', true)
		const result = await findObsoleteSnapshots({
			tracker,
			modules: [runModule('/repo/src/a.spec.ts', [{ taskId: 'skipped', passed: false }])],
			fullRoots: [],
			listFiles: fakeFs([`${root}/a.spec.ts/skipped-0123456789ab.png`, `${root}/a.spec.ts/gone-1.png`]),
		})
		expect(result).toEqual([`${root}/a.spec.ts/gone-1.png`])
	})

	it('flags baselines of test files that are gone only under the full roots', async () => {
		const tracker = createTracker()
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		const files = [`${root}/a.spec.ts/one-1.png`, `${root}/b.spec.ts/one-1.png`, `${root}/gone.spec.ts/one-1.png`]
		markUsed(tracker, `${root}/a.spec.ts/one-1.png`)
		const input = {
			tracker,
			modules: [runModule('/repo/src/a.spec.ts', [{ taskId: 'one', passed: true }])],
			listFiles: fakeFs(files),
		}
		expect(await findObsoleteSnapshots({ ...input, fullRoots: [] })).toEqual([])
		expect(
			await findObsoleteSnapshots({
				...input,
				fullRoots: [{ baselineRoot: root, moduleDirs: [`${root}/a.spec.ts`, `${root}/b.spec.ts`] }],
			}),
		).toEqual([`${root}/gone.spec.ts/one-1.png`])
	})

	it('compares paths without case on Windows', async () => {
		const tracker = createTracker()
		const winRoot = 'C:/repo/__vis__/win32/__baselines__'
		trackModule(
			tracker,
			{ name: 'p', projectRoot: 'C:/repo', baselineRoot: winRoot, options: {} },
			{
				projectName: 'p',
				testPath: 'C:/repo/src/a.spec.ts',
				baselineRoot: winRoot,
				baselineDir: `${winRoot}/a.spec.ts`,
				shortenLongSnapshotPaths: false,
			},
		)
		tracker.used.add(pathKey(`${winRoot}/a.spec.ts/one-1.png`, 'win32'))
		const result = await findObsoleteSnapshots({
			tracker,
			modules: [runModule('C:/repo/src/a.spec.ts', [{ taskId: 'one', passed: true }])],
			fullRoots: [],
			listFiles: async () => ['c:/repo/__vis__/win32/__baselines__/a.spec.ts/one-1.png'],
			platform: 'win32',
		})
		expect(result).toEqual([])
	})
})

describe(toReportedTaskId.name, () => {
	it('matches toTaskId for a test inside suites', () => {
		const module = { type: 'module' }
		const outer = { type: 'suite', name: 'Outer Suite  ', parent: module }
		const inner = { type: 'suite', name: 'inner.suite', parent: outer }
		const test = { name: 'My Test', parent: inner }
		expect(toReportedTaskId(test)).toBe(
			toTaskId({ name: 'My Test', suite: { name: 'inner.suite', suite: { name: 'Outer Suite  ' } } }),
		)
		expect(toReportedTaskId({ name: 'Top', parent: module })).toBe(toTaskId({ name: 'Top' }))
	})
})

describe(getSnapshotTracker.name, () => {
	it('returns the same tracker across calls', () => {
		expect(getSnapshotTracker()).toBe(getSnapshotTracker())
	})

	it('reset keeps the vis projects', () => {
		const tracker = createTracker()
		tracker.visProjects.add('p')
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		markUsed(tracker, '/x.png')
		resetSnapshotTracker(tracker)
		expect([tracker.visProjects.size, tracker.projects.size, tracker.modules.size, tracker.used.size]).toEqual([
			1, 0, 0, 0,
		])
	})
})
