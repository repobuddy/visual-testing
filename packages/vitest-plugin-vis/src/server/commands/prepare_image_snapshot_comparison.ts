import { resolve } from 'pathe'
import { isBase64String } from '../../shared/base64.ts'
import type { PrepareImageSnapshotComparisonCommand } from '../../shared/commands.types.ts'
import type { ImageSnapshotComparisonInfo } from '../../shared/types.ts'
import { file } from '../externals/file.ts'
import { getProjectRoot } from '../project.ts'
import { takeSnapshot } from '../snapshot.ts'
import { snapshotWriter } from '../snapshot_writer.ts'
import { visServerContext } from '../vis_server_context.ts'
import type { ExtendedBrowserCommand } from '../vis_server_context.types.ts'
import { assertTestPathDefined } from './_assertions.ts'

export const prepareImageSnapshotComparison: ExtendedBrowserCommand<
	Parameters<PrepareImageSnapshotComparisonCommand['prepareImageSnapshotComparison']>
> = async (context, taskId, subject, options): Promise<ImageSnapshotComparisonInfo | undefined> => {
	assertTestPathDefined(context, 'prepareImageSnapshotComparison')
	// vitest:browser passes in `null` when not defined
	if (!options) options = {}
	options.timeout = options.timeout ?? 30000

	const projectRoot = getProjectRoot(context)
	const info = await visServerContext.getSnapshotInfo(context, taskId, options)

	const baselineBuffer = await file.tryReadFile(resolve(projectRoot, info.baselinePath))
	if (!baselineBuffer && isBase64String(subject)) {
		await snapshotWriter.writeBase64(resolve(projectRoot, info.resultPath), subject)
		return {
			...info,
			projectRoot,
			result: subject,
		}
	}

	const resultBuffer = await takeSnapshot(context, projectRoot, info.resultPath, subject, options)
	return {
		...info,
		projectRoot,
		baseline: baselineBuffer?.toString('base64'),
		result: resultBuffer.toString('base64'),
	}
}
