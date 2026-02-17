import type { ExtendedBrowserCommand, ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'

export type ViewportSizePayload = { width: number; height: number } | undefined

function setPageViewportSize(
	page: ExtendedBrowserCommandContext['page'],
	size: { width: number; height: number },
): Promise<void> | undefined {
	if (
		!page ||
		typeof (page as { setViewportSize?: (size: { width: number; height: number }) => Promise<void> })
			.setViewportSize !== 'function'
	) {
		return undefined
	}
	return (page as { setViewportSize: (size: { width: number; height: number }) => Promise<void> }).setViewportSize(size)
}

/**
 * Sets the browser page viewport size. Intended to be called from Storybook beforeEach
 * so the viewport is correct before the story renders and before any `.play()` runs.
 */
export const setViewportSize: ExtendedBrowserCommand<[ViewportSizePayload]> = async (context, viewportSize) => {
	if (!viewportSize) return
	const setViewport = setPageViewportSize(context.page, viewportSize)
	if (setViewport) await setViewport
}
