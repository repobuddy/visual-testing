import type { BrowserPage, Locator } from '@vitest/browser/context'
import type { ImageSnapshotIdOptions, ImageSnapshotTimeoutOptions } from '../shared/types.ts'
import { ctx } from './image_snapshot.ctx.ts'

export interface ImageSnapshotAction {
	/**
	 * Take a snapshot of the current page or the specified `options.element`.
	 */
	imageSnapshot(this: BrowserPage, options?: ImageSnapshotOptions | undefined): Promise<ImageSnapshot>
}

export interface ImageSnapshotOptions extends ImageSnapshotTimeoutOptions, ImageSnapshotIdOptions {
	element?: Element | Locator
}

export type ImageSnapshot = {
	type: symbol
	base64: string
	resultPath: string
}

export function imageSnapshot(this: BrowserPage, _options?: ImageSnapshotOptions | undefined): Promise<ImageSnapshot> {
	const test = ctx.getCurrentTest()
	if (!test) {
		return Promise.resolve({
			type: imageSnapshotStubSymbol,
			base64: '',
			resultPath: '',
		})
	}

	if (test.concurrent) {
		throw new Error(
			'Cannot take a screenshot in a concurrent test because ' +
				"concurrent tests run at the same time in the same iframe and affect each other's environment. " +
				'Use a non-concurrent test to take a screenshot.',
		)
	}

	throw new Error('Not implemented')
}

export const imageSnapshotSymbol = Symbol.for('vis/imageSnapshot')

export const imageSnapshotStubSymbol = Symbol.for('vis/imageSnapshotStub')
