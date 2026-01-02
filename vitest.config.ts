import { defineConfig } from 'vitest/config'

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	test: {
		coverage: {
			include: ['packages/*/{src,source,code}/**/*.{js,mjs,cjs,ts,jsx,tsx,cts,mts}'],
			exclude: [
				'**/*.{spec,test,unit,accept,integrate,system,perf,stress}.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
				'**/*.{spec,test,unit,accept,integrate,system,perf,stress}.*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
				'**/*.stories.{js,mjs,jsx,tsx}',
			],
		},
		projects: [
			'./packages/storybook-addon-vis/vitest.config.node.ts',
			'./packages/storybook-addon-vis/vitest.config.playwright.ts',
			'./packages/vitest-plugin-vis/vitest.config.node.ts',
			'./packages/vitest-plugin-vis/vitest.config.playwright.ts',
			// './packages/vitest-plugin-vis/vitest.config.webdriverio.ts',
			'./testcases/react-vite-ts/vite.config.ts',
			'./testcases/sb-csf-3/vitest.config.ts',
			'./testcases/sb-csf-mix/vitest.config.ts',
			'./testcases/sb-csf-next/vitest.config.ts',
			'./testcases/themes/vite.config.ts',
			'./testcases/vpv/vitest.config.ts',
			'./testcases/workspace/vitest.config.a.ts',
			'./testcases/workspace/vitest.config.b.ts',
		],
	},
})
