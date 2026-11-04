import type { ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'
import type { BrowserApi } from './types.ts'

const DEFAULT_MASK_COLOR = '#FF00FF'
const MASK_ATTRIBUTE = 'data-vis-mask'

export function webdriverio(context: ExtendedBrowserCommandContext): BrowserApi {
	const { browser } = context
	return {
		async takeScreenshot(_projectRoot, relativeFilePath, selector, options) {
			const element = await browser.$(`${selector}`)
			return withMask(browser, options, () => element.saveScreenshot(relativeFilePath))
		},
		async takePageScreenshot(_projectRoot, relativeFilePath, options) {
			const { mask, maskColor, ...rest } = options ?? {}
			return withMask(browser, { mask, maskColor }, () => browser.saveScreenshot(relativeFilePath, rest))
		},
	}
}

/**
 * WebdriverIO has no screenshot mask option,
 * so paint an overlay box on top of each match, take the screenshot, and remove the overlays.
 */
async function withMask<T>(
	browser: ExtendedBrowserCommandContext['browser'],
	options: { mask?: string[] | undefined; maskColor?: string | undefined } | undefined,
	action: () => Promise<T>,
): Promise<T> {
	const mask = options?.mask
	if (!mask?.length) return action()

	await browser.execute(
		(selectors: string[], color: string, attribute: string) => {
			for (const selector of selectors) {
				for (const el of Array.from(document.querySelectorAll(selector))) {
					const rect = el.getBoundingClientRect()
					const box = document.createElement('div')
					box.setAttribute(attribute, '')
					box.style.cssText =
						`position:absolute;z-index:2147483647;pointer-events:none;background:${color};` +
						`left:${rect.left + window.scrollX}px;top:${rect.top + window.scrollY}px;` +
						`width:${rect.width}px;height:${rect.height}px;`
					document.body.appendChild(box)
				}
			}
		},
		mask,
		options?.maskColor ?? DEFAULT_MASK_COLOR,
		MASK_ATTRIBUTE,
	)
	try {
		return await action()
	} finally {
		await browser.execute((attribute: string) => {
			for (const el of Array.from(document.querySelectorAll(`[${attribute}]`))) el.remove()
		}, MASK_ATTRIBUTE)
	}
}
