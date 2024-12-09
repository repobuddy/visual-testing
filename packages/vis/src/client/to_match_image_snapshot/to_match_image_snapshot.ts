import type { AsyncExpectationResult } from '@vitest/expect'
import type { PixelmatchOptions } from 'pixelmatch'
import { getCurrentTest } from 'vitest/suite'
import { commands, page } from '../@vitest/browser/context.ts'
import { success } from './expectation_result.ts'

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
	subject: any,
	options?: ToMatchImageSnapshotOptions | undefined,
): AsyncExpectationResult {
	await commands.matchImageSnapshot(
		getCurrentTest()?.name,
		subject instanceof Element ? (page.elementLocator(subject) as any).selector : (subject?.['selector'] ?? subject),
		options,
	)
	return success
}
