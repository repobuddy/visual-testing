import type { BrowserCommand } from 'vitest/node'
import { file } from '../externals/file.ts'
import { visServerContext } from '../vis_server_context.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface ImageSnapshotResult {
	baseline?: string | undefined
	result?: string | undefined
	diff?: string | undefined
}

export interface LoadImageSnapshotResultsCommand {
	loadImageSnapshotResults(taskId: string): Promise<ImageSnapshotResult[]>
}

export const loadImageSnapshotResults: BrowserCommand<[taskId: string]> = async (
	context,
	taskId,
): Promise<ImageSnapshotResult[]> => {
	assertTestPathDefined(context, 'loadImageSnapshotResults')

	const info = await visServerContext.getSnapshotInfo(context, taskId)

	const baselineBuffer = await file.tryReadFile(info.baselinePath)
	const resultBuffer = await file.tryReadFile(info.resultPath)
	const diffBuffer = await file.tryReadFile(info.diffPath)

	return [
		{
			baseline: baselineBuffer?.toString('base64'),
			result: resultBuffer?.toString('base64'),
			diff: diffBuffer?.toString('base64'),
		},
	]
}
