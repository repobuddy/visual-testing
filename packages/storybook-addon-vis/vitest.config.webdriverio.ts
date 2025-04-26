import { storybookVis, trimCommonFolder } from '#storybook-addon-vis/vitest-plugin'
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import { defineProject } from 'vitest/config'

export default defineProject({
	plugins: [
		react(),
		storybookTest({ configDir: join(import.meta.dirname, '.storybook') }),
		storybookVis({
			snapshotSubpath({ subpath }) {
				return `wb/${trimCommonFolder(subpath)}`
			},
			subjectDataTestId: 'subject',
		}),
		{
			name: 'override',
			config() {
				return {
					test: {
						include: [
							'src/client/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
							'src/shared/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
						],
					},
				}
			},
		},
	],
	test: {
		name: 'sav:wb',
		browser: {
			enabled: true,
			headless: true,
			provider: 'webdriverio',
			instances: [{ browser: 'chrome' }],
		},
		setupFiles: ['.storybook/vitest.setup.webdriverio.ts'],
		// enables globals only for testing global usage
		globals: true,
	},
})
