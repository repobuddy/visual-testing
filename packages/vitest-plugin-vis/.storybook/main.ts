import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: ['../src/**/*.{mdx,stories.@(js|jsx|mjs|ts|tsx)}'],

	addons: [
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('@storybook/addon-mdx-gfm'),
		getAbsolutePath('storybook-addon-tag-badges'),
		getAbsolutePath('@storybook-community/storybook-dark-mode'),
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
}
export default config
