import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { join } from 'node:path'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react(), storybookTest({ configDir: join(import.meta.dirname, '.storybook') }), storybookVis()],
	test: {
		name: 'sb-auto-no-snapshot-tag',
		browser: {
			enabled: true,
			headless: true,
			provider: playwright(),
			instances: [{ browser: 'chromium', viewport: { width: 1280, height: 720 } }],
		},
		globalSetup: ['./vitest.global-setup.ts'],
		setupFiles: ['./.storybook/vitest.setup.ts'],
	},
})
