import type { BrowserCommandContext } from 'vitest/node'
import type { BrowserApi } from './types.ts'

export function playwright(context: BrowserCommandContext): BrowserApi {
	return {
		async saveScreenshot(filePath, selector) {
			// The `Locator` type from `vitest` has less props than the `Locator` in `playwright`
			const subject = context.iframe.locator(selector)
			await subject.screenshot({
				timeout: 1000,
				path: filePath,
			})
		},
	}
}
