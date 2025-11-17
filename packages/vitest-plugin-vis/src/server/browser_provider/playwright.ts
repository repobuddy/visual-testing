import { resolve } from 'pathe'
import type { BrowserCommandContext } from 'vitest/node'
import type { BrowserApi } from './types.ts'

export function playwright(context: BrowserCommandContext): BrowserApi {
	const { page, iframe } = context

	return {
		async takeScreenshot(projectRoot, relativeFilePath, selector, options) {
			const subject = iframe.locator(selector)
			return subject.screenshot({
				path: resolve(projectRoot, relativeFilePath),
				...options,
			})
		},
		async takePageScreenshot(projectRoot, relativeFilePath, options) {
			return page.screenshot({
				path: resolve(projectRoot, relativeFilePath),
				...options,
			})
		},
	}
}
