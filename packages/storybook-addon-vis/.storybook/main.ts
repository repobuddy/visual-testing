import { defineStorybookVisOptions } from '#storybook-addon-vis/server'
import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, join } from 'node:path'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-storysource'),
		getAbsolutePath('storybook-addon-tag-badges'),
		getAbsolutePath('@storybook/experimental-addon-test'),
		getAbsolutePath('storybook-dark-mode'),
		{
			name: './local-preset.js',
			options: defineStorybookVisOptions({
				visSuites: [
					{
						snapshotRootDir: '__vis__/linux',
						snapshotSubpath: ({ subpath }) => subpath,
					},
					{
						snapshotRootDir: '__vis__/local',
						snapshotSubpath: ({ subpath }) => subpath,
					},
				],
			}),
		},
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
	docs: {},
}
export default config

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')))
}
