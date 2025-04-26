import { commands } from '@vitest/browser/context'
import type { ToMatchImageSnapshotOptions } from '../../shared/types.ts'
import { matchPageImageSnapshotAction } from '../actions/match_page_image_snapshot_action.ts'
import { ctx } from '../ctx.ts'

export interface ToMatchImageSnapshotAction {
	toMatchImageSnapshot(options?: ToMatchImageSnapshotOptions | undefined): Promise<void>
}

export function toMatchImageSnapshot(options?: ToMatchImageSnapshotOptions | undefined) {
	const test = ctx.getCurrentTest()
	if (!test) {
		throw new Error('`toMatchImageSnapshot()` must be called in a test.')
	}

	if (test.concurrent) {
		throw new Error(
			'`toMatchImageSnapshot()` cannot be called in a concurrent test because ' +
				"concurrent tests run at the same time in the same iframe and affect each other's environment.",
		)
	}

	return matchPageImageSnapshotAction(commands, test, options)
}
