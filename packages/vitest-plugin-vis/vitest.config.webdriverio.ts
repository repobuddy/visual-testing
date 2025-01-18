import { defineConfig } from 'vitest/config'
import { trimCommonFolder, vis } from './src/config.ts'

// https://vitejs.dev/config/
export default defineConfig(() => {
	const browser = process.env.BROWSER ?? 'firefox'
	return {
		plugins: [
			vis({
				customizeSnapshotSubpath(subPath) {
					return `wb/${trimCommonFolder(subPath)}`
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
				// headless: true,
				provider: 'webdriverio',
				instances: [{ browser }],
				api: 63317,
				screenshotFailures: false,
				screenshotDirectory: `__screenshots__/webdriverio/${browser}`,
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
	}
})
