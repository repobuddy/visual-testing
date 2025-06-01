import type { StoryObj } from '@storybook/react-vite'
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
