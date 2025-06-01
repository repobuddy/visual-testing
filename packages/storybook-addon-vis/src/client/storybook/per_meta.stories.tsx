/**
 * Cannot validate the following stories as they are chicken-egg problem.
 */
import type { Meta, StoryObj } from '@storybook/react-vite'

export default {
	title: 'tags/per meta',
	render: () => <>unit test</>,
	tags: ['snapshot'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta

export const TakeSnapshot: StoryObj = {}

export const SkipSnapshot: StoryObj = {
	tags: ['!snapshot'],
}
