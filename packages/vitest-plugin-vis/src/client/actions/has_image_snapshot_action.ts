import type { HasImageSnapshotCommand, ImageSnapshotNextIndexCommand } from '../../commands.ts'
import type { ImageSnapshotIdOptions } from '../../shared/types.ts'
import { toTaskId } from '../task_id.ts'
import type { CurrentTest } from '../vitest_suite_proxy.ts'

export function hasImageSnapshotAction(
	commands: ImageSnapshotNextIndexCommand & HasImageSnapshotCommand,
	test: CurrentTest,
	options?: ImageSnapshotIdOptions | undefined,
) {
	const taskId = toTaskId(test)
	const isAutoSnapshot = !!test.meta.vis?.isAutoSnapshot
	if (options?.customizeSnapshotId) {
		return commands
			.imageSnapshotNextIndex(taskId)
			.then((index) =>
				commands.hasImageSnapshot(
					taskId,
					options.customizeSnapshotId!({ id: taskId, index, isAutoSnapshot }),
					isAutoSnapshot,
				),
			)
	}

	return commands.hasImageSnapshot(taskId, undefined, isAutoSnapshot)
}
