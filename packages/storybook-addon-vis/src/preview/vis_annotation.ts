import type { NamedOrDefaultProjectAnnotations } from 'storybook/internal/types'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { isSnapshotEnabled } from '../client/storybook/tags.ts'
import { commands, getCurrentTest } from '../client/vitest_proxy.ts'
import { resolveViewportToSize } from './viewport.ts'

export const visAnnotations = {
	async beforeEach(ctx) {
		const test = getCurrentTest()
		const rawViewport = ctx.globals?.viewport
		const viewport =
			rawViewport != null
				? typeof rawViewport === 'string'
					? { value: rawViewport, isRotated: false }
					: rawViewport
				: undefined
		const viewportSize = viewport != null ? resolveViewportToSize(viewport) : undefined

		// Set viewport before the story renders and before any .play() runs
		if (viewportSize) {
			await commands.setViewportSize(viewportSize)
		}

		setAutoSnapshotOptions({
			enable: isSnapshotEnabled(ctx.tags),
			...ctx.parameters?.snapshot,
			...(viewport != null && { viewport }),
			...(viewportSize != null && { viewportSize }),
			tags: ctx.tags,
			...test?.meta.vis,
		})
	},
} satisfies NamedOrDefaultProjectAnnotations<any>
