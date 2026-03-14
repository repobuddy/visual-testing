import { vis } from '#vitest-plugin-vis/config'
import { playwright } from '@vitest/browser-playwright'
import { defineProject } from 'vitest/config'

// https://vitejs.dev/config/
export default defineProject({
	plugins: [
		vis({
			snapshotRootDir({ ci, projectName, platform }) {
				return `__vis__/${ci ? platform : 'local'}/${projectName}`
			},
			subject: '[data-testid="subject"]',
		}),
	],
	optimizeDeps: {
		include: ['react/jsx-dev-runtime'],
	},
	test: {
		name: 'vpv:pw',
		browser: {
			enabled: true,
			headless: true,
			provider: playwright({ contextOptions: { viewport: { width: 1280, height: 720 } } }),
			instances: [
				{
					browser: 'chromium',
					name: 'HD',
					screenshotFailures: false,
					viewport: { width: 1280, height: 720 },
					screenshotDirectory: '__screenshots__/playwright/chromium',
				},
				{
					browser: 'chromium',
					name: 'SVGA',
					screenshotFailures: false,
					viewport: { width: 800, height: 600 },
					screenshotDirectory: '__screenshots__/playwright/chromium',
				},
				// {
				// 	browser: 'firefox',
				// 	screenshotFailures: false,
				// 	screenshotDirectory: '__screenshots__/playwright/firefox',
				// },
			],
			api: 63316,
		},
		include: [
			'src/client/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
			'src/setup/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
			'src/shared/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
		],
		setupFiles: ['vitest.setup.playwright.ts'],
		// enables globals only for testing global usage
		globals: true,
	},
})
