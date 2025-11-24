// This file has been automatically migrated to valid ESM format by Storybook.
import { dirname, join } from 'node:path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
	return dirname(import.meta.resolve(join(value, 'package.json')))
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

	addons: [
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('storybook-addon-vis'),
		getAbsolutePath('@storybook/addon-themes'),
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
}
export default config
