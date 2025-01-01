import type { StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'
import { hasImageSnapshot } from './has_image_snapshot.ts'

export default {
	title: 'utils/hasImageSnapshot',
	render: () => <div data-testid="subject">unit</div>,
}

export const AlwaysFalseInStorybook: StoryObj = {
	// When running in storybook, `page.hasImageSnapshot` always returns `false`.
	// This is because there is no way to get snapshot information when running in storybook.
	loaders: [
		async () => {
			return { hasImageSnapshot: await hasImageSnapshot() }
		},
	],
	render: (_, { loaded: { hasImageSnapshot } }) => <div data-testid="subject">{String(hasImageSnapshot)}</div>,
	play: async ({ canvas }) => {
		const subject = canvas.getByTestId('subject')
		expect(subject).toHaveTextContent('false')
	},
}
