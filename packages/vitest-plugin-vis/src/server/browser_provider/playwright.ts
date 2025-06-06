import { resolve } from 'pathe'
import type { BrowserCommandContext } from 'vitest/node'
import type { BrowserApi } from './types.ts'

export function playwright(context: BrowserCommandContext): BrowserApi {
	return {
		async takeScreenshot(projectRoot, relativeFilePath, selector, options) {
			const subject = context.iframe.locator(selector)
			return subject.screenshot({
				path: resolve(projectRoot, relativeFilePath),
				...options,
			})
		},
		async takePageScreenshot(projectRoot, relativeFilePath, options) {
			return context.page.screenshot({
				path: resolve(projectRoot, relativeFilePath),
				...options,
			})
		},
	}
}
