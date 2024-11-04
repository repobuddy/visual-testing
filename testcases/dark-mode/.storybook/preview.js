import { expect } from '@storybook/test'
import { toMatchImageSnapshot } from 'storybook-addon-vis'

expect.extend({ toMatchImageSnapshot })

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	tags: ['snapshot'],
}

export default preview
