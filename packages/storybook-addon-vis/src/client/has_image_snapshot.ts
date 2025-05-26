import { type ImageSnapshotIdOptions, toTaskId } from 'vitest-plugin-vis/client-api'
import { ctx } from './ctx.ts'
import { commands } from './vitest_proxy.ts'

/**
 * Check if the snapshot image exists.
 */
export function hasImageSnapshot(options?: ImageSnapshotIdOptions | undefined) {
	const test = ctx.getCurrentTest()
	if (!test) return false

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
