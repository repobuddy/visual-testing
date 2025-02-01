import { composeStories } from '@storybook/react'
import { it } from 'vitest'
import * as rawStories from './story_snapshot.stories'

const stories = composeStories(rawStories)

it('take whole story snapshot', async ({ expect }) => {
	await stories.Primary.run()
	await expect(document.body).toMatchImageSnapshot()
})
