import type { BrowserCommand } from 'vitest/node'
import { visContext } from '../vis_context.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface HasImageSnapshotCommand {
	hasImageSnapshot(taskId: string, snapshotId: string | undefined, isAutoSnapshot: boolean): Promise<boolean>
}

export const hasImageSnapshot: BrowserCommand<
	[taskId: string, snapshotId: string | undefined, isAutoSnapshot: boolean]
> = async (context, taskId, snapshotId, isAutoSnapshot) => {
	assertTestPathDefined(context, 'hasImageSnapshot')

	return visContext.hasImageSnapshot(context as any, taskId, snapshotId, isAutoSnapshot)
}
