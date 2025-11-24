import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	test: {
		coverage: {
			include: [
				"packages/*/{src,source,code}/**/*.{js,mjs,cjs,ts,jsx,tsx,cts,mts}",
			],
			exclude: [
				"**/*.{spec,test,unit,accept,integrate,system,perf,stress}.{js,jsx,cjs,mjs,ts,tsx,cts,mts}",
				"**/*.{spec,test,unit,accept,integrate,system,perf,stress}.*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}",
				"**/*.stories.{js,mjs,jsx,tsx}",
			],
		},
		projects: [
			"./packages/storybook-addon-vis/vitest.config.node.ts",
			"./packages/storybook-addon-vis/vitest.config.playwright.ts",
			"./packages/vitest-plugin-vis/vitest.config.node.ts",
			"./packages/vitest-plugin-vis/vitest.config.playwright.ts",
			// './packages/vitest-plugin-vis/vitest.config.webdriverio.ts',
			// './testcases/react-vite-ts/vite.config.ts',
			"./testcases/*",
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, ".storybook"),
					}),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [
							{
								browser: "chromium",
							},
						],
					},
					setupFiles: ["testcases/sb-csf-next/.storybook/vitest.setup.ts"],
				},
			},
		],
	},
});
