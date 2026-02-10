import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';

/** Pixel dimensions for browser viewport (matches vitest-plugin-vis ViewportSize). */
export type ViewportSize = { width: number; height: number }

/**
 * Viewport value from Storybook globals (e.g. `globals.viewport`).
 */
type StorybookViewport = {
	value: string
	isRotated?: boolean
}

function parsePx(value: string): number {
	const n = parseInt(value, 10)
	return Number.isNaN(n) ? 0 : n
}

function viewportMapToSizes(
	viewportMap: Record<string, { styles: { width: string; height: string } }>,
): Record<string, ViewportSize> {
	const sizes: Record<string, ViewportSize> = {}
	for (const [id, v] of Object.entries(viewportMap)) {
		if (v?.styles?.width != null && v?.styles?.height != null) {
			sizes[id] = {
				width: parsePx(String(v.styles.width).replace(/px$/, '')),
				height: parsePx(String(v.styles.height).replace(/px$/, '')),
			}
		}
	}
	return sizes
}

const VIEWPORT_SIZES: Record<string, ViewportSize> = {
	...viewportMapToSizes(MINIMAL_VIEWPORTS as Record<string, { styles: { width: string; height: string } }>),
	...viewportMapToSizes(INITIAL_VIEWPORTS as Record<string, { styles: { width: string; height: string } }>),
}

/**
 * Resolves Storybook globals.viewport to pixel dimensions using Storybook's viewport definitions
 * (MINIMAL_VIEWPORTS + INITIAL_VIEWPORTS). When isRotated is true, width and height are swapped.
 */
export function resolveViewportToSize(
	viewport: StorybookViewport | undefined,
): ViewportSize | undefined {
	if (!viewport?.value || typeof viewport.value !== 'string') return undefined
	const size = VIEWPORT_SIZES[viewport.value]
	if (!size) return undefined
	if (viewport.isRotated) {
		return { width: size.height, height: size.width }
	}
	return size
}
