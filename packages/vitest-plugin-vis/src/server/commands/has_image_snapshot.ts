import type { BrowserCommand } from 'vitest/node'
import { visServerContext } from '../vis_server_context.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface HasImageSnapshotCommand {
	hasImageSnapshot(taskId: string, snapshotKey: string | undefined): Promise<boolean>
}

export const hasImageSnapshot: BrowserCommand<Parameters<HasImageSnapshotCommand['hasImageSnapshot']>> = async (
	context,
	taskId,
	snapshotKey,
) => {
	assertTestPathDefined(context, 'hasImageSnapshot')

	return visServerContext.hasImageSnapshot(context as any, taskId, snapshotKey)
}
