import type { Locator } from '@vitest/browser/locator'
import type { AsyncExpectationResult } from '@vitest/expect'
import type { PixelmatchOptions } from 'pixelmatch'
import { getCurrentTest } from 'vitest/suite'
import { commands } from '../@vitest/browser/context'
import { success } from './expectation_result'

export interface ImageSnapshotMatcher2 {
	toMatchImageSnapshot2(options?: ToMatchImageSnapshotOptions | undefined): Promise<void>
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

export async function toMatchImageSnapshot2(
	/**
	 * The element or locator to take the snapshot of,
	 * or the base64 value of the image to compare against.
	 */
	subject: Element | Locator | string,
	options?: ToMatchImageSnapshotOptions | undefined,
): AsyncExpectationResult {
	await commands.matchImageSnapshot(getCurrentTest()?.name, subject, options)
	return success
}
