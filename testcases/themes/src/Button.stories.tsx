import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { expect } from '@storybook/test'
import { page } from 'storybook-addon-vis'
import { Button } from './Button.js'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Example/Button',
	component: Button,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { onClick: fn() },
} as Meta

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: StoryObj = {
	args: {
		primary: true,
		label: 'Button',
	},
	async play() {
		const r = await page.imageSnapshot()
		await expect(r).toMatchImageSnapshot()
	},
}

export const Secondary = {
	args: {
		label: 'Button2',
	},
}

export const Large = {
	args: {
		size: 'large',
		label: 'Button',
	},
}

export const Small = {
	args: {
		size: 'small',
		label: 'Button',
	},
}
