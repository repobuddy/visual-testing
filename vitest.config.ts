import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
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
		workspace: [
			'./packages/storybook-addon-vis/vitest.config.node.ts',
			'./packages/storybook-addon-vis/vitest.config.browser.ts',
			'./packages/vitest-plugin-vis/vitest.config.node.ts',
			'./packages/vitest-plugin-vis/vitest.config.playwright.ts',
		],
	},
})
