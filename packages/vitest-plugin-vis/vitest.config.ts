import ci from 'is-ci'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		coverage: {
			include: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx,cts,mts}'],
			exclude: [
				'**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
				'**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
				'src/presets',
				'src/server/browser_provider',
			],
		},
		workspace: [
			'vitest.config.node.ts',
			'vitest.config.playwright.ts',
			// 'vitest.config.webdriverio.ts',
			// partially blocked by https://github.com/vitest-dev/vitest/issues/6485
			// some snapshots dimensions are not correct, causing the test to fail.
			process.env.COVERAGE || (ci && process.platform === 'win32') ? '' : 'vitest.config.webdriverio.ts',
		].filter(Boolean),
	},
})
