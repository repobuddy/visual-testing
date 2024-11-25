import { expect } from '@storybook/test'
import type { ProjectAnnotations, Renderer, StoryContext } from 'storybook/internal/types'
import { toMatchImageSnapshot } from '../expect.to_match_image_snapshot'
import { state } from '../state'

expect.extend({ toMatchImageSnapshot })

export const storybookPreviewVis = defineVisPreview()

export function defineVisPreview<R extends Renderer>() {
	return {
		beforeEach(ctx: StoryContext) {
			return state.setupStory(ctx)
		},
	} satisfies ProjectAnnotations<R>
}
