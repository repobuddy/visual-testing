import { expect } from '@storybook/test'
import type { ProjectAnnotations, Renderer, StoryContext } from 'storybook/internal/types'
import { toMatchImageSnapshot } from '../client/expect.to_match_image_snapshot.ts'
import { toMatchImageSnapshot2 } from '../client/expect/to_match_image_snapshot.ts'
import { state } from '../client/state.ts'

expect.extend({ toMatchImageSnapshot, toMatchImageSnapshot2 })

export const storybookPreviewVis = defineVisPreview()

export function defineVisPreview<R extends Renderer>() {
	return {
		beforeEach(ctx: StoryContext) {
			return state.setupStory(ctx)
		},
	} satisfies ProjectAnnotations<R>
}
