import ci from 'is-ci'
import { join, relative } from 'pathe'
import type { BrowserCommandContext } from 'vitest/node'
import type { VisOptions } from '../config/types.ts'
import { DIFF_DIR, RESULT_DIR, SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { toSnapshotId } from '../shared/snapshot_id.ts'
import { getSnapshotSubpath } from './snapshot_path.ts'
import { resolveSnapshotRootDir } from './snapshot_path.ts'
import { ctx } from './vis_context.ctx.ts'
import type { VisState } from './vis_context.types.ts'

export type PartialBrowserCommandContext = {
	project: {
		config: {
			root: string
			snapshotOptions: {
				updateSnapshot: 'all' | 'new' | 'none'
			}
			testTimeout: number
			hookTimeout: number
		}
	}
	testPath: string
}

export function createVisContext() {
	let visOptions: VisOptions = {}
	let state: VisState
	let globalStateReady: Promise<VisState>

	return {
		setOptions(options?: VisOptions) {
			visOptions = {
				snapshotRootDir: SNAPSHOT_ROOT_DIR,
				...options,
			}
		},
		/** for testing only */
		getOptions() {
			return visOptions
		},
		__test__reset() {
			visOptions = undefined as any
		},
		__test__getState() {
			return state
		},
		/**
		 * Setup suite is called on each test file's beforeAll hook.
		 * Test files include vitest test files and storybook story files.
		 * It needs to make sure there is no race condition between the test files.
		 */
		async setupSuite(context: PartialBrowserCommandContext) {
			if (!globalStateReady) {
				globalStateReady = setupState(context, visOptions)
				state = await globalStateReady
			}
			await globalStateReady

			const { suiteId, suite } = createSuite(state, context.testPath!, visOptions)
			state.suites[suiteId] = suite
			await Promise.allSettled([ctx.rimraf(suite.diffDir), ctx.rimraf(suite.resultDir)])
		},
		getSnapshotInfo(testPath: string, name: string) {
			const suiteId = getSuiteId(state, testPath, visOptions)
			const suite = state.suites[suiteId]!
			const snapshotId = toSnapshotId(name)
			const task = (suite.tasks[snapshotId] = suite.tasks[snapshotId] ?? { count: 0 })
			const customizeSnapshotId = visOptions.customizeSnapshotId ?? ((id, index) => `${id}-${index}`)

			const snapshotFilename = `${customizeSnapshotId(snapshotId, ++task.count)}.png`
			const baselinePath = join(suite.baselineDir, snapshotFilename)
			const resultPath = join(suite.resultDir, snapshotFilename)
			const diffPath = join(suite.diffDir, snapshotFilename)

			return {
				suiteId,
				snapshotId,
				baselineDir: suite.baselineDir,
				resultDir: suite.resultDir,
				diffDir: suite.diffDir,
				snapshotFilename,
				baselinePath,
				resultPath,
				diffPath,
				snapshotTimeout: (visOptions.snapshotTimeout ?? ci) ? 30000 : 5000,
			}
		},
	}
}

async function setupState(suite: PartialBrowserCommandContext, visOptions: VisOptions) {
	const snapshotRootDir = resolveSnapshotRootDir(visOptions)
	const projectPath = suite.project.config.root
	const platform = ctx.getSnapshotPlatform()

	const state = {
		projectPath,
		platform,
		testTimeout: suite.project.config.testTimeout,
		hookTimeout: suite.project.config.hookTimeout,
		snapshotRootDir,
		snapshotBaselineDir: join(snapshotRootDir, platform),
		snapshotResultDir: join(snapshotRootDir, RESULT_DIR),
		snapshotDiffDir: join(snapshotRootDir, DIFF_DIR),
		snapshotRootPath: join(projectPath, snapshotRootDir),
		suites: {},
	}
	await Promise.allSettled([ctx.rimraf(join(state.snapshotDiffDir)), ctx.rimraf(join(state.snapshotResultDir))])
	return state
}

export function getSuiteId(state: VisState, testPath: string, options: VisOptions) {
	return getSnapshotSubpath(relative(state.projectPath, testPath), options)
}

export function createSuite(state: VisState, testPath: string, options: VisOptions) {
	const suiteId = getSuiteId(state, testPath, options)
	return {
		suiteId,
		suite: {
			baselineDir: join(state.snapshotBaselineDir, suiteId),
			resultDir: join(state.snapshotResultDir, suiteId),
			diffDir: join(state.snapshotDiffDir, suiteId),
			tasks: {},
		},
	}
}
