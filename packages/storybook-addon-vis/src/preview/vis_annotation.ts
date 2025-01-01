import type { ProjectAnnotations, Renderer, StoryContext } from 'storybook/internal/types'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { getCurrentTest } from 'vitest/suite'
import { commands } from '../client/commands_proxy.ts'

export const visAnnotations = {
	async beforeAll() {
		await commands.setupVisSuite()
	},
	beforeEach(ctx: StoryContext) {
		const tags = ctx.tags
		const enable = !tags ? false : tags.lastIndexOf('!snapshot') < tags.lastIndexOf('snapshot')
		const test = getCurrentTest()
		setAutoSnapshotOptions(test, { enable, ...ctx.parameters?.snapshot })
	},
} satisfies ProjectAnnotations<Renderer>
