import type { AsyncExpectationResult } from '@vitest/expect'
import {
	type ToMatchImageSnapshotOptions,
	parseImageSnapshotSubject,
	success,
	toTaskId,
} from 'vitest-plugin-vis/client'
import { getCurrentTest } from 'vitest/suite'
import type { MatchImageSnapshotOptions } from '../../shared/types.ts'
import { commands } from '../@vitest/browser/context.ts'

export interface ImageSnapshotMatcher {
	toMatchImageSnapshot(options?: ToMatchImageSnapshotOptions | undefined): Promise<void>
}

export function toMatchImageSnapshot(
	/**
	 * The element or locator to take the snapshot of,
	 * or the base64 value of the image to compare against.
	 */
	subject: any,
	options?: MatchImageSnapshotOptions | undefined,
): AsyncExpectationResult {
	const test = getCurrentTest()

	/* v8 ignore start: stub as success when not in a test (e.g. in a story) */
	if (!test) {
		return Promise.resolve(success)
	}
	/* v8 ignore end */

	const s = parseImageSnapshotSubject(subject)
	const taskId = toTaskId(test)
	return toMatchImageSnapshotAsync(taskId, s, options).then(() => success)
}

async function toMatchImageSnapshotAsync(taskId: string, subject: string, options?: ToMatchImageSnapshotOptions) {
	if (options?.customizeSnapshotId) {
		const index = await commands.imageSnapshotNextIndex(taskId)
		const { customizeSnapshotId, ...rest } = options
		const snapshotFileId = customizeSnapshotId(taskId, index)
		return commands.matchImageSnapshot(taskId, subject, { ...rest, snapshotFileId })
	}

	return commands.matchImageSnapshot(taskId, subject, options)
}
