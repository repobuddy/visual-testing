import type { StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'

export default {
	title: 'toMatchImageSnapshot',
}

export const MatchingCanvasElement: StoryObj = {
	render: () => <div data-testid="subject">unit</div>,
	async play({ canvasElement }) {
		await expect(canvasElement).toMatchImageSnapshot2()
	},
}

export const MatchingElement: StoryObj = {
	render: () => <div data-testid="subject">unit</div>,
	async play({ canvas }) {
		const element = canvas.getByTestId('subject')
		await expect(element).toMatchImageSnapshot2()
	},
}
