import type { Meta, StoryObj } from '@storybook/react-vite'
import { hasImageSnapshot } from 'storybook-addon-vis'
import { expect } from 'storybook/test'
import { Button } from './Button.tsx'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Example/Story Snapshot',
	component: Button,
	parameters: {
		layout: 'centered',
	},
} as Meta

export const Primary: StoryObj = {
	tags: ['snapshot'],
	args: {
		primary: true,
		label: 'Button',
	},
}

export const Secondary: StoryObj = {
	args: {
		label: 'Button2',
	},
	async play() {
		expect(await hasImageSnapshot()).toEqual(false)
	},
}
