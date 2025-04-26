import type { ImageSnapshotNextIndexCommand } from '../commands.ts'
import type { ToMatchImageSnapshotOptions } from '../shared/types.ts'

export async function parseImageSnapshotOptions(
	_commands: ImageSnapshotNextIndexCommand,
	taskId: string,
	_isAutoSnapshot: boolean,
	options: ToMatchImageSnapshotOptions<any>,
) {
	const { snapshotKey, ...rest } = options
	if (snapshotKey) {
		return { ...rest, snapshotFileId: `${taskId}-${snapshotKey}` }
	}
	return rest
}
