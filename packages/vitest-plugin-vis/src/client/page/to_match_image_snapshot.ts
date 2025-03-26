import type { BrowserPage } from '@vitest/browser/context'
import { ctx } from '../ctx.ts'

export interface ToMatchImageSnapshotAction {
	toMatchImageSnapshot(this: BrowserPage): Promise<void>
}

export async function toMatchImageSnapshot(this: BrowserPage) {
	const test = ctx.getCurrentTest()
	if (!test) {
		throw new Error('`toMatchImageSnapshot()` must be called in a test.')
	}
}
