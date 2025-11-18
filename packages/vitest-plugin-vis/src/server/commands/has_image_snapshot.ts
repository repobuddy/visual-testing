import { visServerContext } from '../vis_server_context.ts'
import type { ExtendedBrowserCommand } from '../vis_server_context.types.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface HasImageSnapshotCommand {
	hasImageSnapshot(taskId: string, snapshotKey: string | undefined): Promise<boolean>
}

export const hasImageSnapshot: ExtendedBrowserCommand<Parameters<HasImageSnapshotCommand['hasImageSnapshot']>> = async (
	context,
	taskId,
	snapshotKey,
) => {
	assertTestPathDefined(context, 'hasImageSnapshot')

	return visServerContext.hasImageSnapshot(context as any, taskId, snapshotKey)
}
