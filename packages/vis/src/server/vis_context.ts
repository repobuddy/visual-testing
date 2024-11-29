import ci from 'is-ci'
import { join, relative } from 'pathe'
import { rimraf } from 'rimraf'
import type { BrowserCommandContext } from 'vitest/node'
import { DIFF_OUTPUT_DIR, RESULT_DIR } from '../shared/contants'
import { resolveSnapshotRootDir } from '../shared/snapshot_path'
import type { VisOptions } from '../shared/types'

// export const visContext: VisContext = {}

// export type VisState = {
// 	snapshotRootDir?: string | undefined
// 	snapshotRootPath?: string | undefined
// 	timeout?: number | undefined
// 	projectPath: string
// 	testTimeout?: number | undefined
// 	hookTimeout?: number | undefined
// 	platform: string
// }

// export type VisContext = {
// 	options?: VisOptions
// 	state: VisState
// 	suite: Record<
// 		string,
// 		{
// 			baselineDir: string
// 			resultDir: string
// 			diffDir: string
// 			tasks: Record<string, { count: number }>
// 		}
// 	>
// }
type Suite = {
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
}

function createVisContext() {
	let visOptions: VisOptions
	let state: {
		projectPath: string
		platform: string
		testTimeout: number
		hookTimeout: number
		snapshotRootDir: string
		snapshotBaselineDir: string
		snapshotResultDir: string
		snapshotDiffDir: string
		snapshotRootPath: string
		suites: Record<
			string,
			{
				baselineDir: string
				resultDir: string
				diffDir: string
				counter: number
			}
		>
	}
	let globalStateReady: Promise<void>

	async function setupGlobalSuite(suite: Suite) {
		const snapshotRootDir = resolveSnapshotRootDir(visOptions)
		const projectPath = suite.project.config.root
		const platform = getSnapshotPlatform()

		state = {
			projectPath,
			platform,
			testTimeout: suite.project.config.testTimeout,
			hookTimeout: suite.project.config.hookTimeout,
			snapshotRootDir,
			snapshotBaselineDir: join(snapshotRootDir, platform),
			snapshotResultDir: join(snapshotRootDir, RESULT_DIR),
			snapshotDiffDir: join(snapshotRootDir, DIFF_OUTPUT_DIR),
			snapshotRootPath: join(projectPath, snapshotRootDir),
			suites: {},
		}
		await Promise.allSettled([rimraf.rimraf(join(state.snapshotDiffDir)), rimraf.rimraf(join(state.snapshotResultDir))])
	}

	return {
		setOptions(options: VisOptions) {
			visOptions = options
		},
		/** for testing only */
		getOptions() {
			return visOptions
		},
		getState(_project: any) {},
		/**
		 * Setup suite is called on each test file's beforeAll hook.
		 * Test files include vitest test files and storybook story files.
		 * It needs to make sure there is no race condition between the test files.
		 */
		async setupSuite(suite: BrowserCommandContext) {
			if (!globalStateReady) {
				globalStateReady = setupGlobalSuite(suite)
			}
			await globalStateReady

			const testPath = relative(state.projectPath, suite.testPath)
			state.suites[testPath] = {
				baselineDir: join(state.snapshotBaselineDir, testPath),
				resultDir: join(state.snapshotResultDir, testPath),
				diffDir: join(state.snapshotDiffDir, testPath),
				counter: 0,
			}
		},
	}
}

export const visContext = createVisContext()

function getSnapshotPlatform() {
	/* v8 ignore next */
	return ci ? process.platform : 'local'
}
