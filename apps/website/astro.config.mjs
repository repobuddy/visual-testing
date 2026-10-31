// @ts-check

import { satteri } from '@astrojs/markdown-satteri'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { normalizeBase } from './src/components/storybook/story-url.ts'
import { PRODUCTION_BASE, rewriteBasePlugin } from './src/plugins/rewrite-base.ts'

// The site is served at PRODUCTION_BASE. PR previews are built with SITE_BASE set to their own prefix,
// for example `/visual-testing/pr-preview/pr-12/`.
const base = normalizeBase(process.env.SITE_BASE ?? PRODUCTION_BASE)

// Old links to the Storybook root (`<base>?path=...`) predate the site. The Storybook now lives at
// `<base>storybook/`, so forward them.
const forwardStorybookLinks = `
if (location.pathname === ${JSON.stringify(base)} && new URLSearchParams(location.search).has('path')) {
	location.replace(${JSON.stringify(`${base}storybook/`)} + location.search + location.hash)
}
`

export default defineConfig({
	site: 'https://repobuddy.github.io',
	base,
	markdown: {
		// Content hard-codes PRODUCTION_BASE links because Starlight does not rewrite them; follow `base`.
		processor: satteri({ mdastPlugins: [rewriteBasePlugin({ to: base })] }),
	},
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
			sidebar: [
				{ label: 'Getting Started', items: [{ label: 'Introduction', slug: '' }] },
				{ label: 'Storybook addon', items: [{ autogenerate: { directory: 'addon' } }] },
				{ label: 'Vitest plugin', items: [{ autogenerate: { directory: 'plugin' } }] },
				{ label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
				{ label: 'Releases', items: [{ autogenerate: { directory: 'releases' } }] },
			],
		}),
	],
})
