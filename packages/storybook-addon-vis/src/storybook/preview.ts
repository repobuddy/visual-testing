import { expect } from '@storybook/test'
import type { ProjectAnnotations, Renderer, StoryContext } from 'storybook/internal/types'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { getCurrentTest } from 'vitest/suite'
import { toMatchImageSnapshot } from '../client/expect/to_match_image_snapshot.ts'

expect.extend({ toMatchImageSnapshot })

export const storybookPreviewVis = defineVisPreview()

export function defineVisPreview<R extends Renderer>() {
	return {
		beforeEach(ctx: StoryContext) {
			const tags = ctx.tags
			const enable = !tags ? false : tags.lastIndexOf('!snapshot') < tags.lastIndexOf('snapshot')
			const test = getCurrentTest()
			setAutoSnapshotOptions(test, { enable, ...ctx.parameters?.snapshot })
			console.info('story.beforeEach', test?.name, test?.meta)
		},
	} satisfies ProjectAnnotations<R>
}
