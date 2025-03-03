import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineWorkspace } from 'vitest/config'

// https://vite.dev/config/
export default defineWorkspace([
	{
		plugins: [react(), storybookTest({ configDir: join(import.meta.dirname, '.storybook') }), storybookVis()],
		test: {
			name: 'a',
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
				'**/*.stories.?(m)[jt]s?(x)',
			],
			setupFiles: ['./.storybook/vitest.setup.ts'],
		},
	},
	{
		plugins: [react(), storybookTest({ configDir: join(import.meta.dirname, '.storybook') }), storybookVis()],
		test: {
			name: 'b',
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
				'**/*.stories.?(m)[jt]s?(x)',
			],
			setupFiles: ['./.storybook/vitest.setup.ts'],
		},
	},
])
