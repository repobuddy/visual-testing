import react from '@vitejs/plugin-react'
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
			timeout: 15000,
		}),
	],
	test: {
		browser: {
			enabled: true,
			headless: true,
			name: 'chromium',
			provider: 'playwright',
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
