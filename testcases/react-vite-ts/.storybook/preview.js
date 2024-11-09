import { visStorybookPreview } from 'storybook-addon-vis'

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
	beforeEach: visStorybookPreview.beforeEach,
	tags: ['snapshot'],
}

export default preview
