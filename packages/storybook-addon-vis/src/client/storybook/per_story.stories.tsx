/**
 * Cannot validate the following stories as they are chicken-egg problem.
 */
import type { Meta, StoryObj } from '@storybook/react'

export default {
	title: 'tags/per story',
	render: () => <div data-testid="subject">unit test</div>,
} satisfies Meta

export const TakeSnapshot: StoryObj = {
	tags: ['snapshot'],
}

export const SkipSnapshot: StoryObj = {
	tags: ['!snapshot'],
}

export const LastWin: StoryObj = {
	tags: ['!snapshot', 'snapshot'],
}
