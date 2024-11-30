import { composeStories } from '@storybook/react'
import { screen } from '@storybook/test'
import { expect, test } from 'vitest'
import * as stories from './image_data.stories.js'

const { ConversionRoundtrip } = composeStories(stories)

test('using screen to access elements in story', async () => {
	await ConversionRoundtrip.run()
	const img = screen.getByTestId('img')
	expect(img).toBeInTheDocument()
})
