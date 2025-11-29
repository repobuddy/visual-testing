import type { ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'
import type { BrowserApi } from './types.ts'

export function webdriverio(context: ExtendedBrowserCommandContext): BrowserApi {
	const { browser } = context
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
