import type { StoryObj } from '@storybook/react'
import { page } from '../../index.ts'

export default {
	title: 'page/toMatchImageSnapshot',
}

export const FullPage: StoryObj = {
	render: () => {
		return <div style={{ height: '1000px', backgroundColor: 'greenyellow' }}>hello world</div>
	},
	async play() {
		await page.toMatchImageSnapshot({
			fullPage: true,
		})
	},
}
