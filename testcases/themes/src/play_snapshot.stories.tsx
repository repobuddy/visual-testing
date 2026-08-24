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
	// `withThemeByClassName` is driven by the `theme` global.
	// Pin it so this story renders in light mode regardless of
	// what the previously executed story left behind.
	globals: {
		theme: 'light',
	},
	args: {
		primary: true,
		label: 'Button',
	},
	async play({ canvasElement }) {
		await expect(canvasElement).toMatchImageSnapshot()
	},
}
