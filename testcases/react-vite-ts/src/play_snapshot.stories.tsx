import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'
import { Button } from './Button.js'

export default {
	title: 'Example/In Play Snapshot',
	component: Button,
	parameters: {
		layout: 'centered',
	},
} as Meta

export const Basic: StoryObj = {
	args: {
		primary: true,
		label: 'Button',
	},
	async play({ canvasElement }) {
		await expect(canvasElement).toMatchImageSnapshot()
	},
}
