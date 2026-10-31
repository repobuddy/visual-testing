import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineMain } from '@storybook/react-vite/node'
import { defineStorybookVis } from 'storybook-addon-vis/node'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

// The website publishes a static build without the Vis addon: its server channel needs Node.
const staticExample = process.env.STORYBOOK_STATIC_EXAMPLE === '1'

export default defineMain({
	stories: ['../src/**/*.{mdx,stories.@(js|jsx|mjs|ts|tsx)}'],
	addons: [
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('@storybook-community/storybook-dark-mode'),
		...(staticExample ? [] : [defineStorybookVis()]),
	],
	framework: getAbsolutePath('@storybook/react-vite'),
	features: {
		// Enables `story.test()` (see StoryTest.stories.ts)
		experimentalTestSyntax: true,
	},
})
