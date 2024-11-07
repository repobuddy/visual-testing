import type { BrowserPage } from '@vitest/browser/context'
import { join } from 'pathe'
import { state } from '../../state'
import { commands } from './context'
import type { CustomizeSnapshotIdOptions } from './types'

export interface HasImageSnapshotAction {
	hasImageSnapshot(this: BrowserPage, options?: CustomizeSnapshotIdOptions | undefined): Promise<boolean>
}

/**
 * Check if the snapshot image exists.
 */
export async function hasImageSnapshot(this: BrowserPage, options?: CustomizeSnapshotIdOptions | undefined) {
	const index = state.snapshot[state.testFilepath][state.id]!.index
	const snapshotFilename = options?.customizeSnapshotId
		? `${options.customizeSnapshotId(state.id, index)}.png`
		: `${state.id}-${index}.png`
	const baselinePath = join(state.baselineDir, snapshotFilename)
	return commands.existFile(baselinePath)
}
