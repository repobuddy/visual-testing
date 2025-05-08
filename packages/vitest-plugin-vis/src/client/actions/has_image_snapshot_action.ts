import type { HasImageSnapshotCommand, ImageSnapshotNextIndexCommand } from '../../commands.ts'
import type { ImageSnapshotKeyOptions } from '../../shared/types.ts'

export function hasImageSnapshotAction(
	commands: ImageSnapshotNextIndexCommand & HasImageSnapshotCommand,
	taskId: string,
	options?: ImageSnapshotKeyOptions | undefined,
) {
	return commands.hasImageSnapshot(taskId, options?.snapshotKey)
}
