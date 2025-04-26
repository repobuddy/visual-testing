import type { ToMatchImageSnapshotOptions } from '../shared/types.ts'

export function parseImageSnapshotOptions(taskId: string, options: ToMatchImageSnapshotOptions<any> | undefined) {
	const { snapshotKey, ...rest } = options ?? {}
	return snapshotKey ? { ...rest, snapshotFileId: `${taskId}-${snapshotKey}` } : rest
}
