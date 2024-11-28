import { join } from 'node:path'
import storybookTest from '@storybook/experimental-addon-test/vitest-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { storybookVis } from './src/vitest-plugin.js'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), storybookTest({ configDir: join(import.meta.dirname, '.storybook') }), storybookVis()],
	test: {
		name: 'vis',
		browser: {
			enabled: true,
			headless: true,
			name: 'chromium',
			provider: 'playwright',
		},
		coverage: {
			include: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx,cts,mts}'],
			exclude: [
				'**/*.{spec,test,unit,accept,integrate,system,perf,stress}.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
				'**/*.{spec,test,unit,accept,integrate,system,perf,stress}.*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
				'**/*.stories.{js,mjs,jsx,tsx}',
			],
		},
		include: [
			'src/client/**/*.{spec,test,unit,accept,integrate,system,perf,stress}.ts',
			'src/shared/**/*.{spec,test,unit,accept,integrate,system,perf,stress}.ts',
			'src/**/*.stories.tsx',
		],
		setupFiles: ['./.storybook/vitest.setup.ts'],
	},
})
