import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { storybookVis } from './src/vitest-plugin.js'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), storybookTest(), storybookVis()],
	test: {
		name: 'vis:node',
		coverage: {
			include: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx,cts,mts}'],
			exclude: [
				'**/*.{spec,test,unit,accept,integrate,system,perf,stress}.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
				'**/*.{spec,test,unit,accept,integrate,system,perf,stress}.*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
				'**/*.stories.{js,mjs,jsx,tsx}',
			],
		},
		globals: true,
		include: [
			// But we are including them here to cover the scenario that
			// not all tests are stories.
			// Also, this is easier for the user to setup.
			'**/*.spec.node.ts',
		],
	},
})
