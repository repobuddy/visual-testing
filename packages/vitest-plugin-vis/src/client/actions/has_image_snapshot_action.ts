import type { HasImageSnapshotCommand, ImageSnapshotNextIndexCommand } from '../../commands.ts'
import type { ImageSnapshotKeyOptions } from '../../shared/types.ts'

export function hasImageSnapshotAction(
	commands: ImageSnapshotNextIndexCommand & HasImageSnapshotCommand,
	taskId: string,
	options?: ImageSnapshotKeyOptions | undefined,
) {
	if (options?.snapshotKey?.includes('-')) {
		throw new Error('Snapshot key cannot contain dash')
	}

	return commands.hasImageSnapshot(taskId, options?.snapshotKey)
}
