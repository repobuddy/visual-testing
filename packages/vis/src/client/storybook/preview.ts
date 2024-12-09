import { expect } from '@storybook/test'
import type { ProjectAnnotations, Renderer, StoryContext } from 'storybook/internal/types'
import { toMatchImageSnapshot } from '../expect.to_match_image_snapshot.ts'
import { state } from '../state.ts'
import { toMatchImageSnapshot2 } from '../to_match_image_snapshot/to_match_image_snapshot.ts'

expect.extend({ toMatchImageSnapshot, toMatchImageSnapshot2 })

export const storybookPreviewVis = defineVisPreview()

export function defineVisPreview<R extends Renderer>() {
	return {
		beforeEach(ctx: StoryContext) {
			return state.setupStory(ctx)
		},
	} satisfies ProjectAnnotations<R>
}
