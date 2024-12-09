import type { BrowserPage } from '@vitest/browser/context'
import type { CustomizeSnapshotIdOptions } from '../../../shared/types.js'
import { state } from '../../state.js'
import { commands } from './context.js'

export interface HasImageSnapshotAction {
	hasImageSnapshot(this: BrowserPage, options?: CustomizeSnapshotIdOptions | undefined): Promise<boolean>
}

/**
 * Check if the snapshot image exists.
 */
export async function hasImageSnapshot(this: BrowserPage, options?: CustomizeSnapshotIdOptions | undefined) {
	const { baselinePath } = state.getSnapshotFilePaths(options)
	return commands.existFile(baselinePath)
}
