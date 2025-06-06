import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, join } from 'node:path'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('storybook-addon-tag-badges'),
		getAbsolutePath('storybook-dark-mode2'),
		{
			name: './local-preset.cjs',
			options: {
				visProjects: [
					{
						snapshotRootDir: '__vis__/linux',
					},
					{
						snapshotRootDir: '__vis__/local',
					},
				],
			},
		},
	],
	tags: {
		internal: {
			excludeFromSidebar: process.env.NODE_ENV === 'production',
		},
	},
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
	docs: {},
}
export default config

function getAbsolutePath(value: string): string {
	return dirname(require.resolve(join(value, 'package.json')))
}
