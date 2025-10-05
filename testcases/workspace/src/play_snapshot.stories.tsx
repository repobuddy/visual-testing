import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Button } from './Button.tsx'

export default {
	title: 'Example/In Play Snapshot',
	component: Button,
	parameters: {
		layout: 'centered',
	},
} as Meta

export const Primary: StoryObj = {
	args: {
		primary: true,
		label: 'Button',
	},
	async play({ canvasElement }) {
		await expect(canvasElement).toMatchImageSnapshot()
	},
}
