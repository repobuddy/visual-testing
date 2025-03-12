import { commands } from '@vitest/browser/context'
import type { AsyncExpectationResult } from '@vitest/expect'
import type { ToMatchImageSnapshotOptions } from '../../shared/types.ts'
import { matchImageSnapshotAction } from '../actions/match_image_snapshot_action.ts'
import { ctx } from '../ctx.ts'
import { success } from './expectation_result.ts'

export function toMatchImageSnapshot(
	/**
	 * The element or locator to take the snapshot of,
	 * or the base64 value of the image to compare against.
	 */
	subject: any,
	options?: ToMatchImageSnapshotOptions | undefined,
): AsyncExpectationResult {
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

	return matchImageSnapshotAction(commands, test, subject, options).then(() => success)
}
