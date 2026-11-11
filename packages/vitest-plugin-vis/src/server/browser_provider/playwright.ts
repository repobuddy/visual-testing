import { resolve } from 'pathe'
import type { ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'
import type { BrowserApi } from './types.ts'

type Size = { width: number; height: number }

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
		async takePageScreenshot(projectRoot, relativeFilePath, { mask, maskColor, fullPage, ...options } = {}) {
			// Vitest browser mode renders the test inside an iframe of its runner page.
			// `page.screenshot()` would capture the runner page,
			// so capture the test iframe instead.
			const owner = iframe.owner()
			const restore = await resizeTestFrame(page, owner, fullPage)
			try {
				return await owner.screenshot({
					path: resolve(projectRoot, relativeFilePath),
					...options,
					...(mask?.length ? { mask: mask.map((m) => iframe.locator(m)) } : {}),
					...(mask?.length && maskColor ? { maskColor } : {}),
				})
			} finally {
				await restore()
			}
		},
	}
}

type Page = ExtendedBrowserCommandContext['page']
type Locator = ReturnType<ExtendedBrowserCommandContext['iframe']['owner']>

/**
 * Show the test iframe at scale 1,
 * at its viewport size or, for `fullPage`, at the size of its content.
 * Grows the runner page viewport when the iframe does not fit in it.
 *
 * Returns a function that restores the previous state.
 */
async function resizeTestFrame(page: Page, owner: Locator, fullPage: boolean | undefined) {
	const target = await owner.evaluate((el: HTMLIFrameElement, fullPage: boolean) => {
		const container = el.parentElement!
		const width = container.offsetWidth
		const height = container.offsetHeight
		if (!fullPage) return { width, height }
		const doc = el.contentDocument!.documentElement
		return {
			width: Math.max(width, doc.scrollWidth),
			height: Math.max(height, doc.scrollHeight),
		}
	}, !!fullPage)

	const prevStyle = await owner.evaluate((el: HTMLIFrameElement, { width, height }: Size) => {
		const container = el.parentElement!
		const prev = container.style.cssText
		container.style.width = `${width}px`
		container.style.height = `${height}px`
		container.style.transform = 'none'
		return prev
	}, target)

	const prevViewport = page.viewportSize()
	const growViewport = prevViewport && (prevViewport.width < target.width || prevViewport.height < target.height)
	if (growViewport) {
		await page.setViewportSize({
			width: Math.max(prevViewport.width, target.width),
			height: Math.max(prevViewport.height, target.height),
		})
	}

	return async () => {
		if (growViewport) await page.setViewportSize(prevViewport)
		await owner.evaluate((el: HTMLIFrameElement, prev: string) => {
			el.parentElement!.style.cssText = prev
		}, prevStyle)
	}
}
