import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { join } from 'node:path'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), storybookTest({ configDir: join(import.meta.dirname, '.storybook') })],
	test: {
		name: 'sb-csf-next',
		browser: {
			enabled: true,
			headless: true,
			provider: playwright(),
			instances: [{ browser: 'chromium', viewport: { width: 1280, height: 720 } }],
		},
		setupFiles: ['./.storybook/vitest.setup.ts'],
	},
})
