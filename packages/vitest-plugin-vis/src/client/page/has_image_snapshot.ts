import { type BrowserPage, commands } from '@vitest/browser/context'
import type { ImageSnapshotKeyOptions } from '../../shared/types.ts'
import { hasImageSnapshotAction } from '../actions/has_image_snapshot_action.ts'
import { ctx } from '../ctx.ts'

export interface HasImageSnapshotAction {
	/**
	 * Check if the snapshot image exists.
	 */
	hasImageSnapshot(this: BrowserPage, options?: ImageSnapshotKeyOptions | undefined): Promise<boolean>
}

export function hasImageSnapshot(this: BrowserPage, options?: ImageSnapshotKeyOptions | undefined) {
	const test = ctx.getCurrentTest()
	if (!test) {
		throw new Error('`hasImageSnapshot()` must be called in a test.')
	}

	if (test.concurrent) {
		throw new Error(
			'`hasImageSnapshot()` cannot be called in a concurrent test because ' +
				"concurrent tests run at the same time in the same iframe and affect each other's environment. ",
		)
	}
	return hasImageSnapshotAction(commands, test, options)
}
