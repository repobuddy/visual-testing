import type { BrowserPage } from '@vitest/browser/context'
import { join } from 'pathe'
import { store } from '../../store'
import { commands } from './context'
import type { CustomizeSnapshotIdOptions } from './types'

export interface HasImageSnapshotAction {
	hasImageSnapshot(this: BrowserPage, options?: CustomizeSnapshotIdOptions | undefined): Promise<boolean>
}

/**
 * Check if the snapshot image exists.
 */
export async function hasImageSnapshot(this: BrowserPage, options?: CustomizeSnapshotIdOptions | undefined) {
	const { baselinePath } = store.getSnapshotFilePaths(options)
	return commands.existFile(baselinePath)
}
