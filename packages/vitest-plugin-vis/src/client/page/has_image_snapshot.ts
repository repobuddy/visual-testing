import type { BrowserPage } from '@vitest/browser/context'
import type { ImageSnapshotIdOptions } from '../../shared/types.ts'
import { ctx } from './ctx.ts'

export interface HasImageSnapshotAction {
	hasImageSnapshot(this: BrowserPage, options?: ImageSnapshotIdOptions | undefined): Promise<boolean>
}

/**
 * Check if the snapshot image exists.
 */
export function hasImageSnapshot(this: BrowserPage, _options?: ImageSnapshotIdOptions | undefined) {
	const test = ctx.getCurrentTest()
	if (!test) {
		throw new Error('`hasImageSnapshot()` must be called in a test.')
	}

	return Promise.resolve(false)
	// return commands.hasImageSnapshot(baselinePath)
}
