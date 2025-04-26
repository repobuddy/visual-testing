import { vis } from '#vitest-plugin-vis/config'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vis({
			snapshotRootDir({ ci, browserName, providerName, platform }) {
				return `__vis__/${ci ? platform : 'local'}/${providerName}/${browserName}`
			},
			subjectDataTestId: 'subject',
		}),
	],
	optimizeDeps: {
		include: ['react/jsx-dev-runtime'],
	},
	test: {
		name: 'vpv:wd',
		browser: {
			enabled: true,
			provider: 'webdriverio',
			instances: [
				{
					browser: 'chrome',
					headless: true,
					screenshotFailures: false,
					screenshotDirectory: '__screenshots__/webdriverio/chrome',
					// @ts-ignore
					// capabilities: {
					// 	'goog:chromeOptions': {
					// 		args: ['--window-size=1280,720'],
					// 	},
					// },
				},
				// {
				// 	browser: 'firefox',
				// 	headless: true,
				// 	screenshotFailures: false,
				// 	screenshotDirectory: '__screenshots__/webdriverio/firefox',
				// },
			],
			api: 63317,
		},
		include: [
			'src/client/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
			'src/setup/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
			'src/shared/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
		],
		setupFiles: ['vitest.setup.webdriverio.ts'],
		// enables globals only for testing global usage
		globals: true,
	},
})
