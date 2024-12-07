import { join } from 'node:path'
import storybookTest from '@storybook/experimental-addon-test/vitest-plugin'
import react from '@vitejs/plugin-react'
import { defineProject } from 'vitest/config'
import { storybookVis } from './src/vitest-plugin.js'

// https://vitejs.dev/config/
export default defineProject(() => {
	const browser = process.env.BROWSER ?? 'chromium'
	const browserProvider = process.env.BROWSERPROVIDER ?? 'playwright'
	return {
		plugins: [react(), storybookTest({ configDir: join(import.meta.dirname, '.storybook') }), storybookVis()],
		test: {
			name: browserProvider === 'playwright' ? 'vis' : 'vis:wb',
			browser: {
				enabled: true,
				headless: true,
				name: browser,
				provider: browserProvider,
			},
			include: [
				'src/client/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
				'src/shared/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
				'src/**/*.stories.tsx',
			],
			setupFiles: [
				browserProvider === 'playwright' ? './.storybook/vitest.setup.ts' : './.storybook/vitest.setup.webdriverio.ts',
			],
		},
	}
})
