// @ts-check
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// Old links to the Storybook root (`/visual-testing/?path=...`) predate the site. The Storybook
// now lives at `/visual-testing/storybook/`, so forward them.
const forwardStorybookLinks = `
if (location.pathname === '/visual-testing/' && new URLSearchParams(location.search).has('path')) {
	location.replace('/visual-testing/storybook/' + location.search + location.hash)
}
`

export default defineConfig({
	site: 'https://repobuddy.github.io',
	base: '/visual-testing/',
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		starlight({
			title: 'visual-testing',
			description: 'Visual testing for Storybook and Vitest.',
			favicon: '/img/logo.svg',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				alt: 'visual-testing',
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/repobuddy/visual-testing',
				},
			],
			head: [{ tag: 'script', content: forwardStorybookLinks }],
			customCss: ['./src/styles/global.css'],
			sidebar: [{ label: 'Getting Started', items: [{ label: 'Introduction', slug: '' }] }],
		}),
	],
})
