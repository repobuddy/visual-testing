import { expect } from '@storybook/test'
import type { ProjectAnnotations, Renderer, StoryContext } from 'storybook/internal/types'
import { toMatchImageSnapshot } from '../expect.to_match_image_snapshot'
import { state } from '../state'

export const visStorybookPreview = defineVisPreview()

export function defineVisPreview<R extends Renderer>(): ProjectAnnotations<R> {
	expect.extend({ toMatchImageSnapshot })
	return {
		beforeEach(ctx: StoryContext) {
			state.parameters = ctx.parameters
		},
	}
}
