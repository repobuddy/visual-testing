import type { BrowserCommand } from 'vitest/node'
import { visContext } from '../vis_context.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface HasImageSnapshotCommand {
	hasImageSnapshot(taskId: string, snapshotId?: string | undefined): Promise<boolean>
}

export const hasImageSnapshot: BrowserCommand<[taskId: string, snapshotId?: string | undefined]> = async (
	context,
	taskId,
	snapshotId,
) => {
	assertTestPathDefined(context, 'hasImageSnapshot')

	return visContext.hasImageSnapshot(context.testPath, taskId, snapshotId)
}
