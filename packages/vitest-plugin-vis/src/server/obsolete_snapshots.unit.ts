import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'pathe'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { markUsed, type SnapshotTracker, trackModule } from './obsolete_snapshots.logic.ts'
import {
	createObsoleteSnapshotsReporter,
	formatReport,
	getFullRoots,
	registerObsoleteSnapshotsReporter,
} from './obsolete_snapshots.ts'

const projectRoot = '/repo'
const root = '/repo/__vis__/linux/__baselines__'

function createTracker(): SnapshotTracker {
	return { visProjects: new Set(['p']), projects: new Map(), modules: new Map(), used: new Set() }
}

function track(tracker: SnapshotTracker, testPath: string, subpath: string, baselineRoot = root) {
	trackModule(
		tracker,
		{ name: 'p', projectRoot, baselineRoot, options: {} },
		{
			projectName: 'p',
			testPath,
			baselineRoot,
			baselineDir: `${baselineRoot}/${subpath}`,
			shortenLongSnapshotPaths: false,
		},
	)
}

const project = { name: 'p', config: { browser: { enabled: true } } } as any
const spec = (moduleId: string) => ({ moduleId, project })

function stubVitest(options: { specs?: string[]; projectFilter?: string[]; update?: boolean } = {}) {
	const log = vi.fn()
	return {
		log,
		vitest: {
			config: { root: projectRoot, project: options.projectFilter ?? [], reporters: [] as unknown[] },
			projects: [project],
			globTestSpecifications: async () => (options.specs ?? []).map(spec),
			logger: { log },
			snapshot: { options: { updateSnapshot: options.update ? 'all' : 'new' } },
		} as any,
	}
}

function stubTestModule(moduleId: string, tests: Array<{ name: string; state: string }>, errors: unknown[] = []) {
	return {
		moduleId,
		project,
		errors: () => errors,
		state: () => (errors.length > 0 ? 'failed' : 'passed'),
		children: {
			*allTests() {
				for (const t of tests) yield { name: t.name, parent: { type: 'module' }, result: () => ({ state: t.state }) }
			},
		},
	} as any
}

describe(getFullRoots.name, () => {
	it('returns the root when every test file of its projects ran', async () => {
		const tracker = createTracker()
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		const { vitest } = stubVitest({ specs: ['/repo/src/a.spec.ts', '/repo/src/b.spec.ts'] })
		const result = await getFullRoots(vitest, tracker, [spec('/repo/src/a.spec.ts'), spec('/repo/src/b.spec.ts')])
		expect(result).toEqual([{ baselineRoot: root, moduleDirs: [`${root}/a.spec.ts`, `${root}/b.spec.ts`] }])
	})

	it('returns nothing when the run is filtered by file, -t on file level, shard, or changed', async () => {
		const tracker = createTracker()
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		const { vitest } = stubVitest({ specs: ['/repo/src/a.spec.ts', '/repo/src/b.spec.ts'] })
		expect(await getFullRoots(vitest, tracker, [spec('/repo/src/a.spec.ts')])).toEqual([])
	})

	it('returns nothing when the run is filtered by project', async () => {
		const tracker = createTracker()
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		const { vitest } = stubVitest({ specs: ['/repo/src/a.spec.ts'], projectFilter: ['p'] })
		expect(await getFullRoots(vitest, tracker, [spec('/repo/src/a.spec.ts')])).toEqual([])
	})

	it('returns nothing when a project that uses the plugin did not report its root', async () => {
		const tracker = createTracker()
		const { vitest } = stubVitest({ specs: ['/repo/src/a.spec.ts'] })
		expect(await getFullRoots(vitest, tracker, [spec('/repo/src/a.spec.ts')])).toEqual([])
	})
})

describe(createObsoleteSnapshotsReporter.name, () => {
	const files = [`${root}/a.spec.ts/one-1.png`, `${root}/a.spec.ts/gone-1.png`, `${root}/gone.spec.ts/x-1.png`]
	const listFiles = async (dir: string) => files.filter((f) => f.startsWith(`${dir}/`))

	async function run(
		options: { update?: boolean; reason?: 'passed' | 'failed' | 'interrupted'; unhandledErrors?: unknown[] } = {},
	) {
		const tracker = createTracker()
		const { vitest, log } = stubVitest({ specs: ['/repo/src/a.spec.ts'], update: options.update })
		const removeFile = vi.fn(async () => {})
		const reporter = createObsoleteSnapshotsReporter({ vitest, tracker, listFiles, removeFile })
		reporter.onTestRunStart([spec('/repo/src/a.spec.ts')])
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		markUsed(tracker, `${root}/a.spec.ts/one-1.png`)
		await reporter.onTestRunEnd(
			[stubTestModule('/repo/src/a.spec.ts', [{ name: 'one', state: 'passed' }])],
			options.unhandledErrors ?? [],
			options.reason ?? 'passed',
		)
		return { log, removeFile }
	}

	it('reports the obsolete baselines without removing them', async () => {
		const { log, removeFile } = await run()
		expect(log).toHaveBeenCalledWith(
			formatReport([`${root}/a.spec.ts/gone-1.png`, `${root}/gone.spec.ts/x-1.png`], projectRoot, false),
		)
		expect(removeFile).not.toHaveBeenCalled()
	})

	it('removes them when updating snapshots', async () => {
		const { log, removeFile } = await run({ update: true })
		expect(removeFile.mock.calls.map((c: any[]) => c[0])).toEqual([
			`${root}/a.spec.ts/gone-1.png`,
			`${root}/gone.spec.ts/x-1.png`,
		])
		expect(log.mock.calls[0]![0]).toContain('2 obsolete image snapshots removed')
	})

	it('does nothing when the run is interrupted or has unhandled errors', async () => {
		for (const r of [
			await run({ reason: 'interrupted', update: true }),
			await run({ unhandledErrors: [{}], update: true }),
		]) {
			expect(r.log).not.toHaveBeenCalled()
			expect(r.removeFile).not.toHaveBeenCalled()
		}
	})

	it('keeps the baselines of a test file with errors of its own', async () => {
		const tracker = createTracker()
		const { vitest, log } = stubVitest({ specs: ['/repo/src/a.spec.ts'] })
		const reporter = createObsoleteSnapshotsReporter({ vitest, tracker, listFiles })
		reporter.onTestRunStart([spec('/repo/src/a.spec.ts')])
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts')
		await reporter.onTestRunEnd([stubTestModule('/repo/src/a.spec.ts', [], [{ message: 'boom' }])], [], 'failed')
		expect(log).toHaveBeenCalledWith(formatReport([`${root}/gone.spec.ts/x-1.png`], projectRoot, false))
	})

	it('does nothing when no test file set up a suite', async () => {
		const { vitest, log } = stubVitest()
		const reporter = createObsoleteSnapshotsReporter({ vitest, tracker: createTracker(), listFiles })
		reporter.onTestRunStart([])
		await reporter.onTestRunEnd([], [], 'passed')
		expect(log).not.toHaveBeenCalled()
	})
})

describe('removing files', () => {
	let dir: string | undefined
	afterEach(async () => {
		if (dir) await rm(dir, { recursive: true, force: true })
	})

	it('removes the file and the folders it leaves empty, up to the baseline root', async () => {
		dir = (await mkdtemp(join(tmpdir(), 'vis-obsolete-'))).replaceAll('\\', '/')
		const baselineRoot = `${dir}/__baselines__`
		await mkdir(`${baselineRoot}/a.spec.ts/group`, { recursive: true })
		await mkdir(`${baselineRoot}/gone.spec.ts/group`, { recursive: true })
		await writeFile(`${baselineRoot}/a.spec.ts/one-1.png`, '')
		await writeFile(`${baselineRoot}/a.spec.ts/group/gone-1.png`, '')
		await writeFile(`${baselineRoot}/gone.spec.ts/group/x-1.png`, '')

		const tracker = createTracker()
		const { vitest } = stubVitest({ specs: ['/repo/src/a.spec.ts'], update: true })
		const reporter = createObsoleteSnapshotsReporter({ vitest, tracker })
		reporter.onTestRunStart([spec('/repo/src/a.spec.ts')])
		track(tracker, '/repo/src/a.spec.ts', 'a.spec.ts', baselineRoot)
		markUsed(tracker, `${baselineRoot}/a.spec.ts/one-1.png`)
		await reporter.onTestRunEnd(
			[stubTestModule('/repo/src/a.spec.ts', [{ name: 'one', state: 'passed' }])],
			[],
			'passed',
		)

		expect(existsSync(`${baselineRoot}/a.spec.ts/one-1.png`)).toBe(true)
		expect(existsSync(`${baselineRoot}/a.spec.ts/group`)).toBe(false)
		expect(existsSync(`${baselineRoot}/gone.spec.ts`)).toBe(false)
		expect(existsSync(baselineRoot)).toBe(true)
	})
})

describe(registerObsoleteSnapshotsReporter.name, () => {
	it('adds the reporter once per Vitest config and keeps the existing reporters', () => {
		const tracker = createTracker()
		const userReporter = ['default', {}]
		const vitest = { config: { reporters: [userReporter] } } as any
		registerObsoleteSnapshotsReporter(vitest, { name: 'a' }, tracker)
		registerObsoleteSnapshotsReporter(vitest, { name: 'b' }, tracker)
		expect(vitest.config.reporters).toHaveLength(2)
		expect(vitest.config.reporters[0]).toBe(userReporter)
		expect([...tracker.visProjects]).toEqual(['p', 'a', 'b'])
	})
})

describe(formatReport.name, () => {
	it('lists the files relative to the root', () => {
		expect(formatReport(['/repo/__vis__/a-1.png'], '/repo', false)).toBe(
			' vis  1 obsolete image snapshot found. Run with -u to remove it.\n   ↳ __vis__/a-1.png\n',
		)
	})
})
