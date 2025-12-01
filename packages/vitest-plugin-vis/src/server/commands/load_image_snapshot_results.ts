import type { ImageSnapshotResult } from '../../shared/commands.types.ts'
import { visServerContext } from '../vis_server_context.ts'
import type { ExtendedBrowserCommand } from '../vis_server_context.types.ts'
import { assertTestPathDefined } from './_assertions.ts'

export const loadImageSnapshotResults: ExtendedBrowserCommand<[taskId: string]> = async (
	context,
	taskId,
): Promise<ImageSnapshotResult[]> => {
	assertTestPathDefined(context, 'loadImageSnapshotResults')
	return visServerContext.getSnapshotResults(context, taskId)
}
