import { join, relative } from 'pathe'
import { pick } from 'type-plus'
import type { VisOptions } from '../config/types.ts'
import { BASELINE_DIR, DIFF_DIR, RESULT_DIR } from '../shared/constants.ts'
import { getProjectId, getProjectRoot } from './project.ts'
import { getSnapshotSubpath, resolveSnapshotRootDir } from './snapshot_path.ts'
import { getVisOption } from './vis_options.ts'
import { deps } from './vis_server_context.deps.ts'
import type { PartialBrowserCommandContext, VisProjectState, VisState } from './vis_server_context.types.ts'

const suites: VisState = {}

/**
 * Setup suite is called on each test file's beforeAll hook.
 * Test files include vitest test files and storybook story files.
 * It needs to make sure there is no race condition between the test files.
 */
export async function setupSuite(browserContext: PartialBrowserCommandContext) {
	const projectId = getProjectId(browserContext)

	const visOptions = getVisOption(browserContext)
	if (!suites[projectId]) {
		suites[projectId] = setupState(browserContext, visOptions)
	}

	const projectState = await suites[projectId]

	const { suiteId, suite } = createSuite(projectState, browserContext.testPath, visOptions)
	projectState.suites[suiteId] = suite

	await Promise.allSettled([deps.rimraf(suite.diffDir), deps.rimraf(suite.resultDir)])
	return pick(projectState, 'subjectDataTestId')
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
		suites: {},
	}
	await Promise.allSettled([deps.rimraf(join(state.snapshotDiffDir)), deps.rimraf(join(state.snapshotResultDir))])
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

export function getSuite(context: PartialBrowserCommandContext) {
	return suites[getProjectId(context)]!
}
