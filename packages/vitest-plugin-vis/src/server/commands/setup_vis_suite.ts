import type { Pick } from 'type-plus'
import type { VisOptions } from '../../config/types.ts'
import { setupSuite } from '../suite.ts'
import type { ExtendedBrowserCommand, ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface SetupVisSuiteCommand {
	/**
	 * Sets up the visual testing suite by cleaning up previous snapshot and diff output directories.
	 * When this command is run for the first time,
	 * it will remove the results and diffs directory of all suites.
	 *
	 * In subsequent runs, it will only remove the results and diffs directory of the current suite.
	 */
	setupVisSuite: () => Promise<
		Pick<
			VisOptions,
			| 'comparisonMethod'
			| 'diffOptions'
			| 'failureThreshold'
			| 'failureThresholdType'
			| 'snapshotKey'
			| 'subject'
			| 'timeout'
		>
	>
}

export const setupVisSuite: ExtendedBrowserCommand<[]> = async (context): Promise<{ subject: string | undefined }> => {
	assertTestPathDefined(context, 'setupVisSuite')
	return setupSuite(context as unknown as ExtendedBrowserCommandContext)
}
