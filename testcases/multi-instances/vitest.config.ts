import { browserTestPreset } from '@repobuddy/vitest/config'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { join } from 'node:path'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		react(),
		storybookTest({ configDir: join(import.meta.dirname, '.storybook') }),
		storybookVis({
			snapshotRootDir(context) {
				return `__vis__/${context.ci ? context.platform : 'local'}/${context.projectName}`
			},
		}),
		browserTestPreset({ includeGeneralTests: true }),
	],
	test: {
		browser: {
			enabled: true,
			headless: true,
			provider: playwright(),
			instances: [
				{ browser: 'chromium', name: 'HD', viewport: { width: 1280, height: 720 } },
				{ browser: 'chromium', name: 'SVGA', viewport: { width: 800, height: 600 } },
			],
		},
		setupFiles: ['./.storybook/vitest.setup.ts'],
	},
})
