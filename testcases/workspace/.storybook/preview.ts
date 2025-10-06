import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import { themes } from 'storybook/theming'

import '../src/tailwind.css'

const cleanup = () => {
	const existing = globalThis.document.querySelector('style[data-theme-css]')
	if (existing) {
		existing.remove()
	}
}

const addStyleSheetDecorator = (storyFn: any) => {
	useEffect(() => {
		cleanup()

		const sheet = globalThis.document.createElement('style')
		sheet.setAttribute('data-theme-css', '')
		sheet.textContent = `
      [data-theme="dark"], .light {
        background-color: white;
        color: black;
      }
      [data-theme="dark"], .dark {
        background-color: black;
        color: white;
      }
    `

		globalThis.document.body.appendChild(sheet)

		return cleanup
	})

	return storyFn()
}

const preview: Preview = {
	decorators: [
		withThemeByClassName({
			defaultTheme: 'dark',
			themes: {
				light: '',
				dark: 'dark',
			},
		}),
		addStyleSheetDecorator,
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			theme: themes.light,
		},
	},
}

export default preview
