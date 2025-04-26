import type { BrowserCommand } from 'vitest/node'
import { file } from '../externals/file.ts'
import { visServerContext } from '../vis_server_context.ts'
import { assertTestPathDefined } from './_assertions.ts'
import type { ImageSnapshotComparisonInfo } from './prepare_image_snapshot_comparison.ts'

export interface LoadImageSnapshotComparisonCommand {
	loadImageSnapshotComparison(taskId: string): Promise<ImageSnapshotComparisonInfo | undefined>
}

export const loadImageSnapshotComparison: BrowserCommand<[taskId: string]> = async (context, taskId) => {
	assertTestPathDefined(context, 'loadImageSnapshotComparison')
	const info = await visServerContext.getSnapshotInfo(context, taskId, false, undefined)

	const resultBuffer = await file.tryReadFile(info.resultPath)
	const diffBuffer = await file.tryReadFile(info.diffPath)

	return {
		...info,
		result: resultBuffer ? resultBuffer.toString('base64') : '',
		diff: diffBuffer ? diffBuffer.toString('base64') : '',
	}
}
