import type { BrowserCommand } from 'vitest/node'
import { visServerContext } from '../vis_server_context.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface SetupVisSuiteCommand {
	/**
	 * Sets up the visual testing suite by cleaning up previous snapshot and diff output directories.
	 * When this command is run for the first time,
	 * it will remove the results and diffs directory of all suites.
	 *
	 * In subsequent runs, it will only remove the results and diffs directory of the current suite.
	 */
	setupVisSuite: () => Promise<{ subjectDataTestId: string | undefined }>
}

export const setupVisSuite: BrowserCommand<[]> = async (
	context,
): Promise<{ subjectDataTestId: string | undefined }> => {
	assertTestPathDefined(context, 'setupVisSuite')
	// using props not currently listed in the types
	return visServerContext.setupSuite(context as any)
}
