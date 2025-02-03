import type { ProjectAnnotations, Renderer, StoryContext } from 'storybook/internal/types'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { isSnapshotEnabled } from '../client/storybook/param.ts'

export const visAnnotations = {
	beforeEach(ctx: StoryContext) {
		setAutoSnapshotOptions({ enable: isSnapshotEnabled(ctx.tags), ...ctx.parameters?.snapshot, tags: ctx.tags })
	},
} satisfies ProjectAnnotations<Renderer>
