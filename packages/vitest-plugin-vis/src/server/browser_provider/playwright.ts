import type { BrowserCommandContext } from 'vitest/node'
import type { BrowserApi } from './types.ts'

export function playwright(context: BrowserCommandContext): BrowserApi {
	return {
		async takeScreenshot(filePath, selector, options) {
			const subject = context.iframe.locator(selector)
			return subject.screenshot({
				path: filePath,
				...options,
			})
		},
		async takePageScreenshot(filePath, options) {
			return context.page.screenshot({
				path: filePath,
				...options,
			})
		},
	}
}
