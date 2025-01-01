import { composeStories } from '@storybook/react'
import { expect, it } from 'vitest'
import * as rawStories from './story_snapshot.stories'

const stories = composeStories(rawStories)

it('take whole story snapshot', async () => {
	await stories.Primary.run()
	await expect(document.body).toMatchImageSnapshot()
})
