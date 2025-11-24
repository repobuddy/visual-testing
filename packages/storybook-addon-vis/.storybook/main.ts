// This file has been automatically migrated to valid ESM format by Storybook.
import { defineStorybookVisOptions } from '#storybook-addon-vis/node'
import type { StorybookConfig } from '@storybook/react-vite'
import { dirname } from 'node:path'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('storybook-addon-tag-badges'),
		getAbsolutePath('@storybook-community/storybook-dark-mode'),
		{
			name: getAbsolutePath('storybook-addon-vis'),
			options: defineStorybookVisOptions({
				visProjects: [
					{
						snapshotRootDir: '__vis__/linux',
					},
					{
						snapshotRootDir: '__vis__/local',
					},
				],
			}),
		},
	],
	tags: {
		internal: {
			excludeFromSidebar: process.env.NODE_ENV === 'production',
		},
	},
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {},
}
export default config

function getAbsolutePath(value: string) {
	return dirname(import.meta.resolve(value, 'package.json'))
}
