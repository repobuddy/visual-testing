import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

// The website publishes a static build without the Vis addon: its server channel needs Node.
const staticExample = process.env.STORYBOOK_STATIC_EXAMPLE === '1'

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	// The published build leaves out `play_snapshot`: its play function needs the Vitest-only `toMatchImageSnapshot` matcher.
	stories: [
		...(staticExample
			? ['../src/**/*.mdx', '../src/**/!(play_snapshot).stories.@(js|jsx|mjs|ts|tsx)']
			: ['../src/**/*.{mdx,stories.@(js|jsx|mjs|ts|tsx)}']),
	],

	addons: [
		getAbsolutePath('@storybook/addon-vitest'),
		...(staticExample ? [] : [getAbsolutePath('storybook-addon-vis')]),
		getAbsolutePath('@storybook/addon-themes'),
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
}
export default config
