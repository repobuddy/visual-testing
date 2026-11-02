import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
	plugins: [react(), vis()],
	test: {
		name: 'showcase',
		browser: {
			enabled: true,
			headless: true,
			provider: playwright(),
			instances: [{ browser: 'chromium', viewport: { width: 1280, height: 360 } }],
		},
		include: ['src/**/*.spec.tsx'],
		setupFiles: ['vitest.setup.ts'],
	},
})
