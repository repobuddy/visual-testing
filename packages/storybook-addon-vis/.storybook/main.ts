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
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('storybook-addon-tag-badges'),
		getAbsolutePath('@storybook-community/storybook-dark-mode'),
		getAbsolutePath('storybook-addon-vis'),
		// defineStorybookVis({
		// 	visProjects: [
		// 		{
		// 			snapshotRootDir: '__vis__/linux',
		// 		},
		// 		{
		// 			snapshotRootDir: '__vis__/local',
		// 		},
		// 	],
		// }),
	],
	tags: {
		internal: {
			excludeFromSidebar: process.env.NODE_ENV === 'production',
		},
	},
	framework: getAbsolutePath('@storybook/react-vite'),
}
export default config
