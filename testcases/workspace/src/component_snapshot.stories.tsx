import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button.js'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Example/Component Snapshot',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['snapshot'],
} as Meta

export const Primary: StoryObj = {
	args: {
		primary: true,
		label: 'Button',
	},
}

export const Secondary = {
	args: {
		label: 'Button2',
	},
}
