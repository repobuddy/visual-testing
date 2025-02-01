import { composeStories } from '@storybook/react'
import { screen } from '@storybook/test'
import { page } from '@vitest/browser/context'
import { test } from 'vitest'
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
