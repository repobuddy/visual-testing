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
}

export default preview
