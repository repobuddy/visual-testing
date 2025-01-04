import type { ProjectAnnotations, Renderer, StoryContext } from 'storybook/internal/types'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { isSnapshotEnabled } from '../client/storybook/param.ts'
import { getCurrentTest } from '../client/vitest_proxy.ts'

export const visAnnotations = {
	beforeEach(ctx: StoryContext) {
		setAutoSnapshotOptions(getCurrentTest(), { enable: isSnapshotEnabled(ctx.tags), ...ctx.parameters?.snapshot })
	},
} satisfies ProjectAnnotations<Renderer>
