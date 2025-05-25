import type { BrowserCommandContext } from 'vitest/node'
import type { BrowserApi } from './types.ts'

export function webdriverio(context: BrowserCommandContext): BrowserApi {
	const browser = context.browser
	return {
		async takeScreenshot(_projectRoot, relativeFilePath, selector) {
			const element = await browser.$(`${selector}`)
			return element.saveScreenshot(relativeFilePath)
		},
		async takePageScreenshot(_projectRoot, relativeFilePath, options) {
			return browser.saveScreenshot(relativeFilePath, options)
		},
	}
}
