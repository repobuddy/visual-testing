import type { StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'

export default {
	title: 'toMatchImageSnapshot/element',
}

export const MatchingCanvas: StoryObj = {
	render: () => <div>unit</div>,
	async play({ canvasElement }) {
		expect(canvasElement).toMatchImageSnapshot2()
	},
}
