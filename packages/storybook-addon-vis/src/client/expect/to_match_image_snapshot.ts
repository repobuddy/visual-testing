import type { AsyncExpectationResult } from '@vitest/expect'
import { type ToMatchImageSnapshotOptions, matchImageSnapshot, success } from 'vitest-plugin-vis/client'
import { getCurrentTest } from '../vitest_proxy.ts'

export function toMatchImageSnapshot(
	/**
	 * The element or locator to take the snapshot of,
	 * or the base64 value of the image to compare against.
	 */
	subject: any,
	options?: ToMatchImageSnapshotOptions | undefined,
): AsyncExpectationResult {
	const test = getCurrentTest()

	/* v8 ignore start: stub as success when not in a test (e.g. in a story) */
	if (!test) return Promise.resolve(success)
	/* v8 ignore end */

	return matchImageSnapshot(test, subject, options).then(() => success)
}
