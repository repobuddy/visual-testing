import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), storybookTest()],
	test: {
		name: 'sb',
		browser: {
			enabled: true,
			headless: true,
			name: 'chromium',
			provider: 'playwright',
			// screenshotFailures: true,
		},
		globals: true,
		include: [
			// Technically non-storybook tests can be execute in NodeJS.
			// But we are including them here to cover the scenario that
			// not all tests are stories.
			// Also, this is easier for the user to setup.
			'**/*.spec.ts',
			'**/*.stories.?(m)[jt]s?(x)',
		],
		// setupFiles: ['./.storybook/vitest.setup.ts'],
	},
})
