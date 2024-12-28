import { commands } from '@vitest/browser/context'
import type { AsyncExpectationResult } from '@vitest/expect'
import type { PixelmatchOptions } from 'pixelmatch'
import { getCurrentTest } from 'vitest/suite'
import { convertToSelector } from '../selector.ts'
import { success } from './expectation_result.ts'

export interface ImageSnapshotMatcher {
	toMatchImageSnapshot(options?: ToMatchImageSnapshotOptions | undefined): Promise<void>
}

export interface ToMatchImageSnapshotOptions {
	/**
	 * Custom options passed to 'pixelmatch'
	 */
	diffOptions?: PixelmatchOptions | undefined
	/**
	 * Failure threshold should measure in `pixel` or `percent`.
	 *
	 * Default is `pixel`.
	 */
	failureThresholdType?: 'pixel' | 'percent' | undefined
	/**
	 * Failure tolerance threshold.
	 *
	 * Default is `0`.
	 */
	failureThreshold?: number | undefined
	/**
	 * Timeout for taking the snapshot.
	 *
	 * Default: 30000
	 */
	timeout?: number | undefined
}

export function toMatchImageSnapshot2(
	/**
	 * The element or locator to take the snapshot of,
	 * or the base64 value of the image to compare against.
	 */
	subject: any,
	options?: ToMatchImageSnapshotOptions | undefined,
): AsyncExpectationResult {
	const test = getCurrentTest()

	/* v8 ignore start: stub as success when not in a test (e.g. in a story) */
	if (!test) {
		return Promise.resolve(success)
	}
	/* v8 ignore end */

	const s = convertToSelector(subject)
	if (!s) {
		throw new Error(
			`'toMatchImageSnapshot()' expects the subject to be an element, locator, or image encoded in base64 string, but got: ${subject}`,
		)
	}

	return commands.matchImageSnapshot(test.name, s, options).then(() => success)
}
