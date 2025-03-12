import type { BrowserCommandContext } from 'vitest/node'
import type { BrowserApi } from './types.ts'

export function webdriverio(context: BrowserCommandContext): BrowserApi {
	const browser = (context.provider as any).browser!
	return {
		async takeScreenshot(filePath, selector) {
			const element = await browser.$(`${selector}`)
			return element.saveScreenshot(filePath)
		},
		async takePageScreenshot(filePath, options) {
			return browser.saveScreenshot(filePath, { fullPage: options?.fullPage })
		},
	}
}
