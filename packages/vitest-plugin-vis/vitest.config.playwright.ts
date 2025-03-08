import { defineConfig } from 'vitest/config'
import { vis } from './src/config.ts'

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		plugins: [
			vis({
				preset: 'none',
				customizeSnapshotId: ({ id, index, isAutoSnapshot }) => (isAutoSnapshot ? `${id}-auto` : `${id}-${index}`),
				subjectDataTestId: 'subject',
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
				provider: 'playwright',
				instances: [
					{
						browser: 'chromium',
						screenshotFailures: false,
						// screenshotDirectory: '__screenshots__/playwright/chromium',
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
	}
})
