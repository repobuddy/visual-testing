import { join, relative, resolve } from 'pathe'
import { pick } from 'type-plus'
import type { VisOptions } from '../config/types.ts'
import { BASELINE_DIR, DIFF_DIR, RESULT_DIR } from '../shared/constants.ts'
import { getProjectName } from './commands/browser_command_context.ts'
import { file } from './file.ts'
import { getSnapshotSubpath, resolveSnapshotRootDir } from './snapshot_path.ts'
import { ctx } from './vis_context.ctx.ts'
import type { PartialBrowserCommandContext, VisProjectState, VisState } from './vis_context.types.ts'

export function createVisContext() {
	let visOptionsRecord: Record<string, VisOptions<any>> = {}
	const state: VisState = {}

	const context = {
		setOptions<M extends 'pixel' | 'ssim'>(projectName: string | undefined, options: VisOptions<M> = {} as any) {
			visOptionsRecord[projectName ?? '__default'] = options
		},
		__test__getOptions(projectName: string) {
			return visOptionsRecord[projectName]
		},
		__test__reset() {
			visOptionsRecord = {} as any
		},
		__test__getState(context: PartialBrowserCommandContext) {
			const projectRoot = getProjectRoot(context)
			return state[projectRoot]!
		},
		/**
		 * Setup suite is called on each test file's beforeAll hook.
		 * Test files include vitest test files and storybook story files.
		 * It needs to make sure there is no race condition between the test files.
		 */
		async setupSuite(context: PartialBrowserCommandContext) {
			const projectRoot = getProjectRoot(context)

			if (!state[projectRoot]) {
				state[projectRoot] = setupState(context, getVisOptions(visOptionsRecord, context) ?? {})
			}

			const projectState = await state[projectRoot]

			const { suiteId, suite } = createSuite(projectState, context.testPath, visOptionsRecord)
			projectState.suites[suiteId] = suite

			await Promise.allSettled([ctx.rimraf(suite.diffDir), ctx.rimraf(suite.resultDir)])
			return pick(projectState, 'subjectDataTestId')
		},
		async getSnapshotInfo(
			browserContext: PartialBrowserCommandContext,
			name: string,
			isAutoSnapshot: boolean,
			options?: { snapshotFileId?: string | undefined },
		) {
			const suiteInfo = await context.getSuiteInfo(browserContext, browserContext.testPath, name)
			const snapshotFilename = context.getSnapshotFilename(
				browserContext,
				suiteInfo,
				options?.snapshotFileId,
				isAutoSnapshot,
			)

			const { baselineDir, resultDir, diffDir, task } = suiteInfo

			task.count = task.count + 1
			const baselinePath = join(baselineDir, snapshotFilename)
			const resultPath = join(resultDir, snapshotFilename)
			const diffPath = join(diffDir, snapshotFilename)

			return {
				...pick(
					getVisOptions(visOptionsRecord, browserContext),
					'comparisonMethod',
					'diffOptions',
					'failureThreshold',
					'failureThresholdType',
					'timeout',
				),
				baselinePath,
				resultPath,
				diffPath,
			}
		},
		async getTaskCount(browserContext: PartialBrowserCommandContext, taskId: string) {
			return (await context.getSuiteInfo(browserContext, browserContext.testPath, taskId)).task.count
		},
		async hasImageSnapshot(
			browserContext: PartialBrowserCommandContext,
			taskId: string,
			snapshotFileId: string | undefined,
			isAutoSnapshot: boolean,
		) {
			const info = await context.getSuiteInfo(browserContext, browserContext.testPath, taskId)

			return file.existFile(
				resolve(
					info.projectRoot,
					info.baselineDir,
					context.getSnapshotFilename(browserContext, info, snapshotFileId, isAutoSnapshot),
				),
			)
		},
		getSnapshotFilename(
			browserContext: PartialBrowserCommandContext,
			info: { taskId: string; task: { count: number } },
			snapshotFileId: string | undefined,
			isAutoSnapshot: boolean,
		) {
			if (snapshotFileId) return `${snapshotFileId}.png`
			const customizeSnapshotId =
				getVisOptions(visOptionsRecord, browserContext).customizeSnapshotId ?? (({ id, index }) => `${id}-${index}`)
			return `${customizeSnapshotId({
				id: info.taskId,
				index: info.task.count,
				isAutoSnapshot,
			})}.png`
		},
		async getSuiteInfo(browserContext: PartialBrowserCommandContext, testPath: string, taskId: string) {
			const projectRoot = getProjectRoot(browserContext)
			const projectState = await state[projectRoot]!

			const suiteId = getSuiteId(projectState, testPath, visOptionsRecord)
			const suite = projectState.suites[suiteId]!
			const task = (suite.tasks[taskId] = suite.tasks[taskId] ?? { count: 1 })
			return {
				projectRoot,
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
	browserContext: PartialBrowserCommandContext,
	visOptions: Pick<VisOptions, 'snapshotRootDir' | 'platform' | 'subjectDataTestId'>,
) {
	const snapshotRootDir = resolveSnapshotRootDir(browserContext, visOptions)
	const projectRoot = getProjectRoot(browserContext)

	const state = {
		projectRoot,
		testTimeout: browserContext.project.config.testTimeout,
		hookTimeout: browserContext.project.config.hookTimeout,
		snapshotRootDir,
		snapshotBaselineDir: join(snapshotRootDir, BASELINE_DIR),
		snapshotResultDir: join(snapshotRootDir, RESULT_DIR),
		snapshotDiffDir: join(snapshotRootDir, DIFF_DIR),
		snapshotRootPath: join(projectRoot, snapshotRootDir),
		subjectDataTestId: visOptions.subjectDataTestId,
		suites: {},
	}
	await Promise.allSettled([ctx.rimraf(join(state.snapshotDiffDir)), ctx.rimraf(join(state.snapshotResultDir))])
	return state
}

export function createSuite(
	state: VisProjectState,
	testPath: string,
	options: Pick<VisOptions, 'customizeSnapshotSubpath'>,
) {
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

export function getSuiteId(
	state: VisProjectState,
	testPath: string,
	options: Pick<VisOptions, 'customizeSnapshotSubpath'>,
) {
	return getSnapshotSubpath(relative(state.projectRoot, testPath), options)
}

function getVisOptions(visOptionsRecord: Record<string, VisOptions<any>>, context: PartialBrowserCommandContext) {
	return visOptionsRecord[getProjectName(context) ?? '__default']!
}

function getProjectRoot(context: PartialBrowserCommandContext) {
	return context.project.config.root
}
