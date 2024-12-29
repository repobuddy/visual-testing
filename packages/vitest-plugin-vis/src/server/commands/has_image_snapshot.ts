import type { BrowserCommand } from 'vitest/node'
import { visContext } from '../vis_context.ts'

export interface HasImageSnapshotCommand {
	hasImageSnapshot(taskName: string, snapshotId?: string | undefined): Promise<boolean>
}

export const hasImageSnapshot: BrowserCommand<[taskName: string, snapshotId?: string | undefined]> = async (
	context,
	taskName,
	snapshotId,
) => {
	if (!context.testPath) {
		throw new Error('Cannot take snapshot without testPath')
	}

	return visContext.hasImageSnapshot(context.testPath, taskName, snapshotId)
}
