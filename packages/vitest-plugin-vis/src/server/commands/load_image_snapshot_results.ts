import type { BrowserCommand } from 'vitest/node'
import { visServerContext } from '../vis_server_context.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface ImageSnapshotResult {
	filename: string
	/**
	 * The base64 encoded image of the baseline snapshot.
	 */
	baseline?: string | undefined
	/**
	 * The base64 encoded image of the result snapshot.
	 */
	result?: string | undefined
	/**
	 * The base64 encoded image of the diff snapshot.
	 */
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

	return visServerContext.getSnapshotResults(context, taskId)

	// const baselineBuffer = await file.tryReadFile(info.baselinePath)
	// const resultBuffer = await file.tryReadFile(info.resultPath)
	// const diffBuffer = await file.tryReadFile(info.diffPath)

	// return [
	// 	{
	// 		baseline: baselineBuffer?.toString('base64'),
	// 		result: resultBuffer?.toString('base64'),
	// 		diff: diffBuffer?.toString('base64'),
	// 	},
	// ]
}
