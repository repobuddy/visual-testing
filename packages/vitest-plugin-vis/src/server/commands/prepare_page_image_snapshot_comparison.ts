import { resolve } from 'pathe'
import type { PreparePageImageSnapshotComparisonCommand } from '../../shared/commands.types.ts'
import { file } from '../externals/file.ts'
import { getProjectRoot } from '../project.ts'
import { takePageSnapshot } from '../snapshot.ts'
import { visServerContext } from '../vis_server_context.ts'
import type { ExtendedBrowserCommand } from '../vis_server_context.types.ts'
import { assertTestPathDefined } from './_assertions.ts'

export const preparePageImageSnapshotComparison: ExtendedBrowserCommand<
	Parameters<PreparePageImageSnapshotComparisonCommand['preparePageImageSnapshotComparison']>
> = async (context, taskId, options) => {
	assertTestPathDefined(context, 'preparePageImageSnapshotComparison')
	// vitest:browser passes in `null` when not defined
	if (!options) options = {}
	options.timeout = options.timeout ?? 30000

	const projectRoot = getProjectRoot(context)
	const info = await visServerContext.getSnapshotInfo(context, taskId, options)
	const baselineBuffer = await file.tryReadFile(resolve(projectRoot, info.baselinePath))
	const resultBuffer = await takePageSnapshot(context, projectRoot, info.resultPath, options)
	return {
		...info,
		projectRoot,
		baseline: baselineBuffer?.toString('base64'),
		result: resultBuffer.toString('base64'),
	}
}
