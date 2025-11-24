import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { vis } from 'vitest-plugin-vis/config'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		vis({
			preset: 'auto',
			comparisonMethod: 'ssim',
			diffOptions: { ssim: 'bezkrovny' },
			failureThreshold: 0.01,
			failureThresholdType: 'percent',
			timeout: 60000,
		}),
	],
	test: {
		name: 'tv:pw',
		browser: {
			enabled: true,
			headless: true,
			provider: playwright(),
			instances: [{ browser: 'chromium', viewport: { width: 1280, height: 720 } }],
		},
		include: [
			// But we are including them here to cover the scenario that
			// not all tests are stories.
			// Also, this is easier for the user to setup.
			'**/*.spec.ts?(x)',
		],
		setupFiles: ['vitest.setup.ts'],
	},
})
