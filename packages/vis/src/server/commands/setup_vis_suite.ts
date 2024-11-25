import { join } from 'pathe'
import { rimraf } from 'rimraf'
import type { BrowserCommand } from 'vitest/node'
import { DIFF_OUTPUT_DIR, RESULT_DIR } from '../../shared/contants'
import { getSubpath } from '../../store'
import { getVisContext } from '../vis_context'

export interface SetupVisSuiteCommand {
	/**
	 * Setup the vis suite.
	 */
	setupVisSuite: (suite: { file: { filepath: string }; name: string }) => Promise<void>
}

/**
 * Sets up the visual testing suite by cleaning up previous snapshot and diff output directories.
 *
 * @param context - The context of the browser command execution.
 * @param suite - An object containing the suite details.
 * @param suite.file.filepath - The file path of the suite.
 * @param suite.name - The name of the suite.
 *
 * @returns A promise that resolves when the setup is complete.
 */
export const setupVisSuite: BrowserCommand<[suite: { file: { filepath: string }; name: string }]> = async (
	context,
	suite,
) => {
	const visContext = await getVisContext(context.project)
	const suiteDir = getSubpath(suite.name, visContext.options)
	const baselineDir = join(visContext.state.snapshotRootPath, visContext.state.platform, suiteDir)
	const resultDir = join(visContext.state.snapshotRootPath, RESULT_DIR, suiteDir)
	const diffDir = join(visContext.state.snapshotRootPath, DIFF_OUTPUT_DIR, suiteDir)

	visContext.suite[suite.file.filepath] = {
		baselineDir,
		resultDir,
		diffDir,
		tasks: {},
	}
	await rimraf(resultDir)
	await rimraf(diffDir)
}
