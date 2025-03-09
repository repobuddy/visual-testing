import type { BrowserCommandContext } from 'vitest/node'
import type { BrowserApi } from './types.ts'

export function webdriverio(context: BrowserCommandContext): BrowserApi {
	const page = (context.provider as any).browser!
	return {
		async takeScreenshot(filePath, selector) {
			const element = await page.$(`${selector}`)
			// biome-ignore lint/suspicious/noConsoleLog: <explanation>
			console.log('takeScreenshot', selector, element)
			return await element.saveScreenshot(filePath)
		},
	}
}
