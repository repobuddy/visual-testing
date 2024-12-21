import type { AsyncExpectationResult } from '@vitest/expect'
import { getCurrentTest } from 'vitest/suite'
import type { MatchImageSnapshotOptions } from '../../shared/types.ts'
import { commands, page } from '../@vitest/browser/context.ts'
import { success } from './expectation_result.ts'

export interface ImageSnapshotMatcher2 {
	toMatchImageSnapshot2(options?: MatchImageSnapshotOptions | undefined): Promise<void>
}

export async function toMatchImageSnapshot2(
	/**
	 * The element or locator to take the snapshot of,
	 * or the base64 value of the image to compare against.
	 */
	subject: any,
	options?: MatchImageSnapshotOptions | undefined,
): AsyncExpectationResult {
	if (subject === undefined) {
		throw new Error(
			'`toMatchImageSnapshot()` expects the subject to be an element, locator, or result of `page.imageSnapshot()`, but got: `undefined`',
		)
	}
	await commands.matchImageSnapshot(
		getCurrentTest()?.name,
		subject instanceof Element ? (page.elementLocator(subject) as any).selector : (subject?.['selector'] ?? subject),
		options,
	)
	return success
}
