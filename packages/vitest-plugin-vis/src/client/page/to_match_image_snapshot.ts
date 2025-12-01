import { commands } from 'vitest/browser'
import type { ComparisonMethod, ToMatchPageImageSnapshotOptions } from '../../shared/types.ts'
import { matchPageImageSnapshotAction } from '../actions/match_page_image_snapshot_action.ts'
import { ctx } from '../ctx.ts'
import { toTaskId } from '../task/task_id.ts'

export interface ToMatchImageSnapshotAction {
	toMatchImageSnapshot<M extends ComparisonMethod = 'pixel'>(
		options?: ToMatchPageImageSnapshotOptions<M> | undefined,
	): Promise<void>
}

export function toMatchImageSnapshot<M extends ComparisonMethod = 'pixel'>(
	options?: ToMatchPageImageSnapshotOptions<M> | undefined,
) {
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

	return matchPageImageSnapshotAction(commands, toTaskId(test), options)
}
