import { toTaskId } from 'vitest-plugin-vis/client'
import { getCurrentTest } from 'vitest/suite'
import type { CustomizeSnapshotIdOptions } from '../shared/types.ts'
import { commands } from './@vitest/browser/context.ts'

/**
 * Check if the snapshot image exists.
 */
export async function hasImageSnapshot(options?: CustomizeSnapshotIdOptions | undefined) {
	const test = getCurrentTest()
	if (!test) {
		return true
	}

	const taskId = toTaskId(test)
	if (options?.customizeSnapshotId) {
		return commands
			.imageSnapshotNextIndex(taskId)
			.then((index) => commands.hasImageSnapshot(taskId, options.customizeSnapshotId!(taskId, index)))
	}

	return commands.hasImageSnapshot(taskId)
}
