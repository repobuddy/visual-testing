import type { ImageSnapshotNextIndexCommand } from '../commands.ts'
import type { ToMatchImageSnapshotOptions } from '../shared/types.ts'

export async function parseImageSnapshotOptions(
	commands: ImageSnapshotNextIndexCommand,
	taskId: string,
	isAutoSnapshot: boolean,
	options: ToMatchImageSnapshotOptions<any>,
) {
	const index = await commands.imageSnapshotNextIndex(taskId)
	const { customizeSnapshotId, snapshotKey, ...rest } = options
	if (snapshotKey) {
		return { ...rest, snapshotFileId: `${taskId}-${snapshotKey}` }
	}
	const snapshotFileId = customizeSnapshotId!({ id: taskId, index, isAutoSnapshot })
	return { ...rest, snapshotFileId }
}
