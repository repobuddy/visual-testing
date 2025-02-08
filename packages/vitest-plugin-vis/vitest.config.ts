import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		coverage: {
			include: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx,cts,mts}'],
			exclude: [
				'**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
				'**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
				'src/server/browser_provider',
			],
		},
		workspace: [
			'vitest.config.playwright.ts',
			// partially blocked by https://github.com/vitest-dev/vitest/issues/6485
			// some snapshots dimensions are not correct, causing the test to fail.
			// process.env.COVERAGE || (ci && process.platform === 'win32') ? '' : 'vitest.config.webdriverio.ts',
			'vitest.config.node.ts',
		].filter(Boolean),
	},
})
