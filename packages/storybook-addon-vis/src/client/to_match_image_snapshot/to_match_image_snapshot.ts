import type { AsyncExpectationResult } from '@vitest/expect'
import { type ToMatchImageSnapshotOptions, success, toMatchImageSnapshot } from 'vitest-plugin-vis/client'
import { getCurrentTest } from 'vitest/suite'
import type { MatchImageSnapshotOptions } from '../../shared/types.ts'

export interface ImageSnapshotMatcher2 {
	toMatchImageSnapshot2(options?: ToMatchImageSnapshotOptions | undefined): Promise<void>
}

export function toMatchImageSnapshot2(
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

	return toMatchImageSnapshot(subject, options)
}
