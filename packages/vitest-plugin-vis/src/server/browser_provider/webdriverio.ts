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
			const { mask, maskColor, fullPage } = options ?? {}
			const screenshot = () => browser.saveScreenshot(relativeFilePath)
			return withMask(browser, { mask, maskColor }, () =>
				fullPage ? withFullPageFrame(context, screenshot) : screenshot(),
			)
		},
	}
}

type Size = { width: number; height: number }

type FrameProvider = {
	isIframeSwitched?(): boolean
	switchToTestFrame?(): Promise<void>
	switchToMainFrame?(): Promise<void>
	setViewport?(size: Size): Promise<void>
}

/**
 * Vitest browser mode renders the test inside an iframe of its runner page,
 * and the runner page sizes its viewport to the iframe.
 * WebdriverIO's own `fullPage` capture works on the runner page and returns the viewport,
 * so grow the iframe and the viewport to the content of the test page,
 * take a viewport screenshot, then restore them.
 */
async function withFullPageFrame<T>(context: ExtendedBrowserCommandContext, action: () => Promise<T>): Promise<T> {
	const { browser } = context
	const provider = context.provider as unknown as FrameProvider
	if (!provider.switchToMainFrame || !provider.switchToTestFrame || !provider.setViewport) return action()

	const inTestFrame = provider.isIframeSwitched?.() ?? false
	if (!inTestFrame) await provider.switchToTestFrame()
	const content: Size = await browser.execute(() => ({
		width: document.documentElement.scrollWidth,
		height: document.documentElement.scrollHeight,
	}))

	await provider.switchToMainFrame()
	try {
		const { prev, viewport } = await browser.execute(
			(width: number, height: number) => {
				const container = document.querySelector('iframe[data-vitest]')!.parentElement!
				const viewport = { width: container.offsetWidth, height: container.offsetHeight }
				const prev = container.style.cssText
				container.style.width = `${Math.max(width, viewport.width)}px`
				container.style.height = `${Math.max(height, viewport.height)}px`
				container.style.transform = 'none'
				return { prev, viewport }
			},
			content.width,
			content.height,
		)
		await provider.setViewport({
			width: Math.max(content.width, viewport.width),
			height: Math.max(content.height, viewport.height),
		})
		try {
			return await action()
		} finally {
			await provider.setViewport(viewport)
			await browser.execute((prev: string) => {
				document.querySelector('iframe[data-vitest]')!.parentElement!.style.cssText = prev
			}, prev)
		}
	} finally {
		if (inTestFrame) await provider.switchToTestFrame()
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
