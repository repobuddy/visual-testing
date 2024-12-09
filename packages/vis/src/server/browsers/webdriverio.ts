import type { BrowserCommandContext } from 'vitest/node'
import type { BrowserApi } from './types.js'

export function webdriverio(context: BrowserCommandContext): BrowserApi {
	const page = (context.provider as any).browser!
	return {
		async saveScreenshot(filePath, selector) {
			const element = await page.$(`${selector}`)
			await element.saveScreenshot(filePath)
		},
	}
}
