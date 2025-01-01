import type { Preview } from '@storybook/react'
import { visAnnotations } from '../src/index.ts'

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

	beforeEach: visAnnotations.beforeEach,
}

export default preview
