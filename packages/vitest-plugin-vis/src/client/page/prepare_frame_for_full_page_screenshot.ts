/**
 * Resize the test iframe (and ancestors) so full-page screenshots capture all content.
 * Vitest's orchestrator uses overflow: hidden and fixed iframe dimensions, which clips
 * content below the fold. This workaround is from:
 * https://github.com/vitest-dev/vitest/discussions/7749
 *
 * Must be called from inside the iframe (the test/story context) before taking the screenshot.
 */
export function prepareFrameForFullPageScreenshot(): Promise<void> {
	return new Promise((resolve) => {
		requestAnimationFrame(() => {
			const iframe = window.frameElement as HTMLIFrameElement | null
			if (!iframe) {
				resolve()
				return
			}
			const width = document.body.scrollWidth
			const height = document.body.scrollHeight
			iframe.style.width = `${width}px`
			iframe.style.height = `${height}px`
			// Walk up ancestors so the iframe isn't clipped by a parent with overflow hidden
			let ancestor: Element | null = iframe.parentElement
			while (ancestor) {
				const el = ancestor as HTMLElement
				el.style.width = `${width}px`
				el.style.height = `${height}px`
				el.style.overflow = 'visible'
				ancestor = ancestor.parentElement
			}
			resolve()
		})
	})
}
