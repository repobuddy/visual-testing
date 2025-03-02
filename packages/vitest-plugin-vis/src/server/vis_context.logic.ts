import { join, relative } from 'pathe'
import { pick } from 'type-plus'
import { getCurrentTest } from 'vitest/suite'
import type { VisOptions } from '../config/types.ts'
import { BASELINE_DIR, DIFF_DIR, RESULT_DIR } from '../shared/constants.ts'
import type { CurrentTest } from '../shared/types.ts'
import { file } from './file.ts'
import { getSnapshotSubpath, resolveSnapshotRootDir } from './snapshot_path.ts'
import { ctx } from './vis_context.ctx.ts'
import type { PartialBrowserCommandContext, VisState } from './vis_context.types.ts'

export function createVisContext() {
	let visOptions: VisOptions<any> = {}
	let state: VisState
	let globalStateReady: Promise<VisState>

	const context = {
		setOptions<M extends 'pixel' | 'ssim'>(options: VisOptions<M> = {} as any) {
			visOptions = options
		},
		__test__getOptions() {
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
			} else {
				await globalStateReady
			}

			const { suiteId, suite } = createSuite(state, context.testPath, visOptions)
			state.suites[suiteId] = suite
			await Promise.allSettled([ctx.rimraf(suite.diffDir), ctx.rimraf(suite.resultDir)])
			return pick(state, 'subjectDataTestId')
		},
		getSnapshotInfo(testPath: string, name: string, options?: { snapshotFileId?: string | undefined }) {
			const info = context.getSuiteInfo(testPath, name)
			const snapshotFilename = context.getSnapshotFilename(info, options?.snapshotFileId)

			const { baselineDir, resultDir, diffDir, task } = info

			task.count = task.count + 1
			const baselinePath = join(baselineDir, snapshotFilename)
			const resultPath = join(resultDir, snapshotFilename)
			const diffPath = join(diffDir, snapshotFilename)

			return {
				...pick(visOptions, 'comparisonMethod', 'diffOptions', 'failureThreshold', 'failureThresholdType', 'timeout'),
				baselinePath,
				resultPath,
				diffPath,
			}
		},
		getTaskCount(testPath: string, taskId: string) {
			return context.getSuiteInfo(testPath, taskId).task.count
		},
		hasImageSnapshot(testPath: string, taskId: string, snapshotFileId: string | undefined) {
			const info = context.getSuiteInfo(testPath, taskId)
			return file.existFile(join(info.baselineDir, context.getSnapshotFilename(info, snapshotFileId)))
		},
		getSnapshotFilename(info: { taskId: string; task: { count: number } }, snapshotFileId: string | undefined) {
			if (snapshotFileId) return `${snapshotFileId}.png`
			const test = getCurrentTest() as CurrentTest
			const isAutoSnapshot = !!test?.meta.vis?.isAutoSnapshot
			const customizeSnapshotId = visOptions.customizeSnapshotId ?? (({ id, index }) => `${id}-${index}`)
			return `${customizeSnapshotId({
				id: info.taskId,
				index: info.task.count,
				isAutoSnapshot,
			})}.png`
		},
		getSuiteInfo(testPath: string, taskId: string) {
			const suiteId = getSuiteId(state, testPath, visOptions)
			const suite = state.suites[suiteId]!
			const task = (suite.tasks[taskId] = suite.tasks[taskId] ?? { count: 1 })
			return {
				suiteId,
				taskId,
				baselineDir: suite.baselineDir,
				resultDir: suite.resultDir,
				diffDir: suite.diffDir,
				task,
			}
		},
	}
	return context
}

async function setupState(
	suite: PartialBrowserCommandContext,
	visOptions: Pick<VisOptions, 'snapshotRootDir' | 'platform' | 'subjectDataTestId'>,
) {
	const snapshotRootDir = resolveSnapshotRootDir(suite, visOptions)
	const projectPath = suite.project.config.root

	const state = {
		projectPath,
		testTimeout: suite.project.config.testTimeout,
		hookTimeout: suite.project.config.hookTimeout,
		snapshotRootDir,
		snapshotBaselineDir: join(snapshotRootDir, BASELINE_DIR),
		snapshotResultDir: join(snapshotRootDir, RESULT_DIR),
		snapshotDiffDir: join(snapshotRootDir, DIFF_DIR),
		snapshotRootPath: join(projectPath, snapshotRootDir),
		subjectDataTestId: visOptions.subjectDataTestId,
		suites: {},
	}
	await Promise.allSettled([ctx.rimraf(join(state.snapshotDiffDir)), ctx.rimraf(join(state.snapshotResultDir))])
	return state
}

export function createSuite(state: VisState, testPath: string, options: Pick<VisOptions, 'customizeSnapshotSubpath'>) {
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

export function getSuiteId(state: VisState, testPath: string, options: Pick<VisOptions, 'customizeSnapshotSubpath'>) {
	return getSnapshotSubpath(relative(state.projectPath, testPath), options)
}
