import { visServerContext } from '../vis_server_context.ts'
import type { ExtendedBrowserCommand } from '../vis_server_context.types.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface ImageSnapshotNextIndexCommand {
	/**
	 * Get the index of the snapshot image to be created.
	 */
	imageSnapshotNextIndex(taskId: string): Promise<number>
}

export const imageSnapshotNextIndex: ExtendedBrowserCommand<
	Parameters<ImageSnapshotNextIndexCommand['imageSnapshotNextIndex']>
> = async (context, taskId) => {
	assertTestPathDefined(context, 'imageSnapshotNextIndex')

	return visServerContext.getTaskCount(context, taskId)
}
