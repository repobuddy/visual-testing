import type { Preview } from '@storybook/react'
import { visStorybookPreview } from '../src/index.js'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	initialGlobals: {
		background: { value: 'light' },
	},
	beforeEach: visStorybookPreview.beforeEach,
}

export default preview
