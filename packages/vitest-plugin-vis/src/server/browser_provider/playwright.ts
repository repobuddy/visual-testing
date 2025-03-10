import type { BrowserCommandContext } from 'vitest/node'
import type { BrowserApi } from './types.ts'

export function playwright(context: BrowserCommandContext): BrowserApi {
	return {
		async takeScreenshot(filePath, selector, options) {
			if (options?.fullPage) {
				return context.page.screenshot({
					path: filePath,
					timeout: options?.timeout,
					fullPage: true,
				})
			}
			// The `Locator` type from `vitest` has less props than the `Locator` in `playwright`
			const subject = context.iframe.locator(selector)

			return subject.screenshot({
				timeout: options?.timeout,
				path: filePath,
			})
		},
	}
}
