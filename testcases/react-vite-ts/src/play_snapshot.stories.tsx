import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/test'
import { page } from 'storybook-addon-vis'
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
	async play() {
		const r = await page.imageSnapshot()
		await expect(r).toMatchImageSnapshot()
	},
}

export const CanSkipAwait: StoryObj = {
	args: {
		primary: true,
		label: 'Button',
	},
	async play() {
		const r = await page.imageSnapshot()
		expect(r).toMatchImageSnapshot()
	},
}
