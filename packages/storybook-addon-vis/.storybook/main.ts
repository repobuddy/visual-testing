import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, join } from 'node:path'
const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		'@storybook/addon-storysource',
		getAbsolutePath('@storybook/experimental-addon-test'),
		'./local-preset.js',
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
