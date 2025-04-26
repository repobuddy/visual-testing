import type { BrowserCommandContext } from 'vitest/node'
import type { BrowserApi } from './types.ts'

export function playwright(context: BrowserCommandContext): BrowserApi {
	return {
		async takeScreenshot(filePath, selector, options) {
			// The `Locator` type from `vitest` has less props than the `Locator` in `playwright`
			const subject = context.iframe.locator(selector)
			return subject.screenshot({
				path: filePath,
				...options,
			})
		},
		async takePageScreenshot(filePath, options) {
			return context.page.screenshot({
				timeout: options?.timeout,
				path: filePath,

				fullPage: options?.fullPage,
			})
		},
	}
}
