import type { StorybookConfig } from '@storybook/react-vite'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineStorybookVis } from 'storybook-addon-vis/node'

function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
	stories: ['../src/**/*.{mdx,stories.@(js|jsx|mjs|ts|tsx)}'],
	addons: [
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('@storybook-community/storybook-dark-mode'),
		defineStorybookVis(),
	],
	framework: getAbsolutePath('@storybook/react-vite'),
}
export default config
