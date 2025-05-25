import { browserTestPreset } from '@repobuddy/vitest/config'
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineWorkspace } from 'vitest/config'

// https://vite.dev/config/
export default defineWorkspace([
	{
		plugins: [
			react(),
			storybookTest({ configDir: join(import.meta.dirname, '.storybook') }),
			storybookVis(),
			browserTestPreset({ includeGeneralTests: true }),
		],
		test: {
			name: 'a',
			browser: {
				enabled: true,
				headless: true,
				name: 'chromium',
				provider: 'playwright',
			},
			setupFiles: ['./.storybook/vitest.setup.ts'],
		},
	},
	{
		plugins: [
			react(),
			storybookTest({ configDir: join(import.meta.dirname, '.storybook') }),
			storybookVis(),
			browserTestPreset({ includeGeneralTests: true }),
		],
		test: {
			name: 'b',
			browser: {
				enabled: true,
				headless: true,
				name: 'chromium',
				provider: 'playwright',
			},
			setupFiles: ['./.storybook/vitest.setup.ts'],
		},
	},
])
