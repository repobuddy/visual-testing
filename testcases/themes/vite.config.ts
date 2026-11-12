import { join } from 'node:path'
import { browserTestPreset } from '@repobuddy/vitest/config'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		storybookTest({ configDir: join(import.meta.dirname, '.storybook') }),
		storybookVis(),
		// @repobuddy/vitest 3 sets enforce: 'pre' on the preset, which drops the general tests next to storybookTest.
		{ ...browserTestPreset({ includeGeneralTests: true }), enforce: undefined },
	],
	test: {
		name: 'tt:pw',
		browser: {
			enabled: true,
			headless: true,
			api: { allowWrite: true },
			provider: playwright(),
			instances: [{ browser: 'chromium', viewport: { width: 1280, height: 720 } }],
		},
		setupFiles: ['./.storybook/vitest.setup.ts'],
	},
})
