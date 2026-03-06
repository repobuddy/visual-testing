/**
 * Viewport value from Storybook globals (e.g. `globals.viewport`).
 * When `isRotated` is true, width and height are swapped when resolving to size.
 */
export type StorybookViewport = {
	value: string
	isRotated?: boolean
}

export type ViewportSize = {
	width: number
	height: number
}
