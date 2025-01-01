import { type ImageSnapshotIdOptions, toTaskId } from 'vitest-plugin-vis/client'
import { getCurrentTest } from 'vitest/suite'
import { commands } from './@vitest/browser/context.ts'

/**
 * Check if the snapshot image exists.
 */
export async function hasImageSnapshot(options?: ImageSnapshotIdOptions | undefined) {
	const test = getCurrentTest()
	if (!test) {
		return false
	}

	const taskId = toTaskId(test)
	if (options?.customizeSnapshotId) {
		return commands
			.imageSnapshotNextIndex(taskId)
			.then((index) => commands.hasImageSnapshot(taskId, options.customizeSnapshotId!(taskId, index)))
	}

	return commands.hasImageSnapshot(taskId)
}
