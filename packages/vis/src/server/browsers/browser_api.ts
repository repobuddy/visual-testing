import type { BrowserCommandContext } from 'vitest/node'
import { playwright } from './playwright.js'
import { webdriverio } from './webdriverio.js'

export function browserApi(context: BrowserCommandContext) {
	if (context.provider.name === 'playwright') {
		return playwright(context)
	}
	if (context.provider.name === 'webdriverio') {
		return webdriverio(context)
	}
}
