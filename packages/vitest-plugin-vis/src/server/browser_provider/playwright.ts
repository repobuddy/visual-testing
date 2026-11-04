import { resolve } from 'pathe'
import type { ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'
import type { BrowserApi } from './types.ts'

export function playwright(context: ExtendedBrowserCommandContext): BrowserApi {
	const { page, iframe } = context

	return {
		async takeScreenshot(projectRoot, relativeFilePath, selector, { mask, maskColor, ...options } = {}) {
			const subject = iframe.locator(selector)
			return subject.screenshot({
				path: resolve(projectRoot, relativeFilePath),
				...options,
				...(mask?.length ? { mask: mask.map((m) => iframe.locator(m)) } : {}),
				...(mask?.length && maskColor ? { maskColor } : {}),
			})
		},
		async takePageScreenshot(projectRoot, relativeFilePath, { mask, maskColor, ...options } = {}) {
			return page.screenshot({
				path: resolve(projectRoot, relativeFilePath),
				...options,
				...(mask?.length ? { mask: mask.map((m) => iframe.locator(m)) } : {}),
				...(mask?.length && maskColor ? { maskColor } : {}),
			})
		},
	}
}
