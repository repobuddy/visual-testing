import { join, relative } from 'pathe'
import { pick } from 'type-plus'
import type { VisOptions } from '../config/types.ts'
import { BASELINE_DIR, DIFF_DIR, RESULT_DIR } from '../shared/constants.ts'
import { getProjectName, getProjectRoot } from './project.ts'
import { getSnapshotSubpath, resolveSnapshotRootDir } from './snapshot_path.ts'
import { getVisOption } from './vis_options.ts'
import { deps } from './vis_server_context.deps.ts'
import type { PartialBrowserCommandContext, VisSuite, VisSuites } from './vis_server_context.types.ts'

const suites: VisSuites = {}

/**
 * Setup suite is called on each test file's beforeAll hook.
 * Test files include vitest test files and storybook story files.
 * It needs to make sure there is no race condition between the test files.
 */
export async function setupSuite(browserContext: PartialBrowserCommandContext) {
	const suiteId = getSuiteId(browserContext)
	const visOptions = getVisOption(browserContext)

	if (!suites[suiteId]) {
		suites[suiteId] = setupState(browserContext, visOptions)
	}

	const suite = await suites[suiteId]

	const { taskSubpath, baselineDir, diffDir, resultDir, tasks } = createModule(
		suite,
		browserContext.testPath,
		visOptions,
	)
	suite.modules[taskSubpath] = { baselineDir, diffDir, resultDir, tasks }

	await Promise.allSettled([deps.rimraf(diffDir), deps.rimraf(resultDir)])
	return pick(suite, 'subjectDataTestId')
}

/**
 * Suite ID also contains the project name to make it unique
 * across different projects.
 */
export function getSuiteId(context: {
	project: { config: { root: string; name: string }; vite: { config: { test?: { name?: string | undefined } } } }
}) {
	return `${getProjectName(context)}/${context.project.config.name}`
}

async function setupState(
	browserContext: PartialBrowserCommandContext,
	visOptions: Pick<VisOptions, 'snapshotRootDir' | 'subjectDataTestId'>,
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
		modules: {},
	}
	await Promise.allSettled([deps.rimraf(join(state.snapshotDiffDir)), deps.rimraf(join(state.snapshotResultDir))])
	return state
}

export function createModule(state: VisSuite, testPath: string, options: Pick<VisOptions, 'customizeSnapshotSubpath'>) {
	const taskSubpath = getTaskSubpath(state, testPath, options)
	return {
		taskSubpath,
		baselineDir: join(state.snapshotBaselineDir, taskSubpath),
		resultDir: join(state.snapshotResultDir, taskSubpath),
		diffDir: join(state.snapshotDiffDir, taskSubpath),
		tasks: {},
	}
}

export function getTaskSubpath(
	state: VisSuite,
	testPath: string,
	options: Pick<VisOptions, 'customizeSnapshotSubpath'>,
) {
	return getSnapshotSubpath(relative(state.projectRoot, testPath), options)
}

export function getSuite(context: PartialBrowserCommandContext) {
	return suites[getSuiteId(context)]!
}
