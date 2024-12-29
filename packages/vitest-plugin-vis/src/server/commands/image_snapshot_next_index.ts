import type { BrowserCommand } from 'vitest/node'
import { visContext } from '../vis_context.ts'

export interface ImageSnapshotNextIndexCommand {
	/**
	 * Get the index of the snapshot image to be created.
	 */
	imageSnapshotNextIndex(name: string): Promise<number>
}

export const imageSnapshotNextIndex: BrowserCommand<[name: string]> = async (context, name) => {
	if (!context.testPath) {
		throw new Error('Cannot take snapshot without testPath')
	}

	return visContext.getTaskCount(context.testPath, name)
}
