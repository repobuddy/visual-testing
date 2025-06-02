import {
	createDarkModeDocsContainer,
	defineDarkModeParam,
	withDarkMode,
} from '@repobuddy/storybook/storybook-dark-mode'
import type { Preview } from '@storybook/react-vite'

import '../tailwind.css'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			container: createDarkModeDocsContainer(),
		},
		...defineDarkModeParam({
			classTarget: 'html',
			stylePreview: true,
			darkClass: 'dark',
		}),
	},
	decorators: [
		withDarkMode({
			bodyClass: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-100',
		}),
	],
}

export default preview
