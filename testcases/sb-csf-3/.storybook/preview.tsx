import { useDarkMode } from '@storybook-community/storybook-dark-mode'
import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'

const preview: Preview = {
	decorators: [
		(Story) => {
			const isDark = useDarkMode()
			useEffect(() => {
				if (isDark) {
					document.documentElement.classList.add('dark')
				} else {
					document.documentElement.classList.remove('dark')
				}
			}, [isDark])
			return <Story />
		},
	],
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
