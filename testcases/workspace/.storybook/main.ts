// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
	return dirname(require.resolve(join(value, 'package.json')))
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
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
}
export default config
