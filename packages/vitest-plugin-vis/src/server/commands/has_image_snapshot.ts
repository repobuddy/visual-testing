import type { HasImageSnapshotCommand } from '../../shared/commands.types.ts'
import { visServerContext } from '../vis_server_context.ts'
import type { ExtendedBrowserCommand } from '../vis_server_context.types.ts'
import { assertTestPathDefined } from './_assertions.ts'

export const hasImageSnapshot: ExtendedBrowserCommand<Parameters<HasImageSnapshotCommand['hasImageSnapshot']>> = async (
	context,
	taskId,
	snapshotKey,
) => {
	assertTestPathDefined(context, 'hasImageSnapshot')

	return visServerContext.hasImageSnapshot(context as any, taskId, snapshotKey)
}
