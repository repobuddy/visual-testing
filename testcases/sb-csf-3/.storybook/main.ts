import type { StorybookConfig } from '@storybook/react-vite'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('@storybook-community/storybook-dark-mode'),
		getAbsolutePath('storybook-addon-vis'),
	],
	framework: getAbsolutePath('@storybook/react-vite'),
}
export default config
