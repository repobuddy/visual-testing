import { composeStories } from '@storybook/react-vite'
import { screen } from 'storybook/test'
import { test } from 'vitest'
import { page } from 'vitest/browser'
import * as stories from './expect/to_match_image_snapshot.stories.tsx'

const { MatchingElement } = composeStories(stories)

test('using screen to access elements in story', async ({ expect }) => {
	await MatchingElement.run()
	const subject = screen.getByTestId('subject')
	expect(subject).toBeInTheDocument()
})

test('using page to access elements in story', async ({ expect }) => {
	await MatchingElement.run()
	const subject = page.getByTestId('subject')
	expect(subject.element()).toBeInTheDocument()
})
