import type { Preview } from '@storybook/react-vite'
import { visAnnotations } from 'storybook-addon-vis/vitest-setup'

const preview: Preview = {
	// Merged here so Storybook's Vitest addon picks it up: no `setProjectAnnotations()` in `vitest.setup.ts`.
	...visAnnotations,
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo',
		},
	},
	tags: ['snapshot'],
}

export default preview
