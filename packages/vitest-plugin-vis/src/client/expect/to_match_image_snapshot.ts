import { commands } from '@vitest/browser/context'
import type { AsyncExpectationResult } from '@vitest/expect'
import { ctx } from '../ctx.ts'
import { toTaskId } from '../task_id.ts'
import { success } from './expectation_result.ts'
import { parseImageSnapshotSubject } from './to_match_image_snapshot.logic.ts'
import type { ToMatchImageSnapshotOptions } from './to_match_image_snapshot.types.ts'

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
				"concurrent tests run at the same time in the same iframe and affect each other's environment. ",
		)
	}

	const s = parseImageSnapshotSubject(subject)
	const taskId = toTaskId(test)
	return toMatchImageSnapshotAsync(taskId, s, options).then(() => success)
}

async function toMatchImageSnapshotAsync(taskId: string, subject: string, options?: ToMatchImageSnapshotOptions) {
	return commands.matchImageSnapshot(
		taskId,
		subject,
		options?.customizeSnapshotId ? await transformOptions(taskId, options) : options,
	)
}

async function transformOptions(taskId: string, options: ToMatchImageSnapshotOptions) {
	const index = await commands.imageSnapshotNextIndex(taskId)
	const { customizeSnapshotId, ...rest } = options
	const snapshotFileId = customizeSnapshotId!(taskId, index)
	return { ...rest, snapshotFileId }
}
