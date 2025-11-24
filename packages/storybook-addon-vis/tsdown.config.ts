import { readFile } from 'node:fs/promises'
import { globalPackages as globalManagerPackages } from 'storybook/internal/manager/globals'
import { globalPackages as globalPreviewPackages } from 'storybook/internal/preview/globals'
import { type UserConfig, defineConfig } from 'tsdown'

// The current browsers supported by Storybook v7
const BROWSER_TARGET: UserConfig['target'] = ['chrome100', 'safari15', 'firefox91']
const NODE_TARGET: UserConfig['target'] = ['node18']

type BundlerConfig = {
	bundler?: {
		exportEntries?: string[]
		nodeEntries?: string[]
		managerEntries?: string[]
		previewEntries?: string[]
	}
}

export default defineConfig(async (options) => {
	const packageJson = (await readFile('./package.json', 'utf8').then(JSON.parse)) as BundlerConfig
	const { bundler: { exportEntries = [], managerEntries = [], previewEntries = [], nodeEntries = [] } = {} } =
		packageJson

	const commonConfig = {
		minify: false,
		// minify: !options.watch,
		format: ['esm'],
		treeshake: true,
		sourcemap: true,
		clean: !options.watch,
		/**
			The following packages are provided by Storybook and should always be externalized
			Meaning they shouldn't be bundled with the addon, and they shouldn't be regular dependencies either
		*/
		external: [
			/^@storybook-community\/.*$/,
			/^@storybook\/.*$/,
			'react',
			/^react\/.*$/,
			'storybook',
			/^storybook\/.*$/,
			/^vitest-plugin-vis/,
		],
	} satisfies UserConfig

	const configs: UserConfig[] = []

	// configs.push({
	// 	...commonConfig,
	// 	entry: ['src/vitest-plugin.ts'],
	// 	// TODO: enable dts resolve?
	// 	// not working due to:
	// 	// - https://github.com/storybookjs/storybook/issues/29443
	// 	// - https://github.com/egoist/tsdown/issues/1239
	// 	dts: {
	// 		resolve: false,
	// 	},
	// 	clean: false,
	// 	minify: false,
	// 	format: ['esm'],
	// 	target: NODE_TARGET,
	// 	platform: 'node',
	// })

	// export entries are entries meant to be manually imported by the user
	// they are not meant to be loaded by the manager or preview
	// they'll be usable in both node and browser environments, depending on which features and modules they depend on
	if (exportEntries.length) {
		configs.push({
			...commonConfig,
			entry: exportEntries,
			dts: {
				resolve: true,
			},
			clean: false,
			minify: false,
			format: ['esm'],
			target: [...BROWSER_TARGET, ...NODE_TARGET],
			platform: 'neutral',
			external: [
				...globalManagerPackages,
				...globalPreviewPackages,
				...commonConfig.external,
				'vitest',
				'vitest-plugin-vis',
				'@vitest/expect',
				'@vitest/browser',
			],
		})
	}

	// manager entries are entries meant to be loaded into the manager UI
	// they'll have manager-specific packages externalized and they won't be usable in node
	// they won't have types generated for them as they're usually loaded automatically by Storybook
	if (managerEntries.length) {
		configs.push({
			...commonConfig,
			entry: managerEntries,
			target: 'esnext',
			platform: 'browser',
			external: [...globalManagerPackages, ...commonConfig.external],
		})
	}

	// preview entries are entries meant to be loaded into the preview iframe
	// they'll have preview-specific packages externalized and they won't be usable in node
	// they'll have types generated for them so they can be imported when setting up Portable Stories
	if (previewEntries.length) {
		configs.push({
			...commonConfig,
			entry: previewEntries,
			dts: {
				resolve: true,
			},
			target: 'esnext',
			platform: 'browser',
			external: [...globalPreviewPackages, ...commonConfig.external],
		})
	}

	// node entries are entries meant to be used in node-only
	// this is useful for presets, which are loaded by Storybook when setting up configurations
	// they won't have types generated for them as they're usually loaded automatically by Storybook
	if (nodeEntries.length) {
		configs.push({
			...commonConfig,
			entry: nodeEntries,
			target: NODE_TARGET,
			platform: 'node',
		})
	}

	return configs
})
