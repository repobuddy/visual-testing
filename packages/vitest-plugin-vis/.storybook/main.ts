import { dirname, join } from 'node:path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
	return dirname(require.resolve(join(value, 'package.json')))
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

	addons: [
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('storybook-addon-tag-badges'),
		getAbsolutePath('@storybook-community/storybook-dark-mode'),
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
}
export default config
