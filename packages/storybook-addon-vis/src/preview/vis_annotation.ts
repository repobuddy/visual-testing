import type { ProjectAnnotations, Renderer, StoryContext } from 'storybook/internal/types'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { getCurrentTest } from '../client/vitest_proxy.ts'

export const visAnnotations = {
	beforeEach(ctx: StoryContext) {
		const tags = ctx.tags
		const enable = !tags ? false : tags.lastIndexOf('!snapshot') < tags.lastIndexOf('snapshot')
		const test = getCurrentTest()
		setAutoSnapshotOptions(test, { enable, ...ctx.parameters?.snapshot })
	},
} satisfies ProjectAnnotations<Renderer>
