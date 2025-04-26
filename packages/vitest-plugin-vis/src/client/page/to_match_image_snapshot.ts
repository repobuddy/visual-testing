import type { BrowserPage } from '@vitest/browser/context'
import { ctx } from '../ctx.ts'

export interface ToMatchImageSnapshotAction {
	toMatchImageSnapshot(this: BrowserPage): Promise<void>
}

export function toMatchImageSnapshot(this: BrowserPage) {
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

	return Promise.resolve()
}
