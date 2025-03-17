import type { BrowserCommand } from 'vitest/node'
import { visContext } from '../vis_context.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface ImageSnapshotNextIndexCommand {
	/**
	 * Get the index of the snapshot image to be created.
	 */
	imageSnapshotNextIndex(taskId: string): Promise<number>
}

export const imageSnapshotNextIndex: BrowserCommand<
	Parameters<ImageSnapshotNextIndexCommand['imageSnapshotNextIndex']>
> = async (context, taskId) => {
	assertTestPathDefined(context, 'imageSnapshotNextIndex')

	return visContext.getTaskCount(context, taskId)
}
