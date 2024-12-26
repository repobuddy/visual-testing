import { defineProject } from 'vitest/config'
import { vis } from './src/config.ts'

// https://vitejs.dev/config/
export default defineProject(() => {
	const browser = process.env.BROWSER ?? 'firefox'
	return {
		plugins: [vis()],
		test: {
			name: 'vpv:wd',
			browser: {
				enabled: true,
				headless: true,
				name: browser,
				provider: 'webdriverio',
				api: 63317,
				screenshotDirectory: `__screenshots__/webdriverio/${browser}`,
			},
			include: [
				'src/client/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
				'src/shared/**/*.{spec,test,unit,accept,integrate,system,study,perf,stress}.{ts,tsx}',
			],
			setupFiles: ['vitest.setup.webdriverio.ts'],
			// enables globals only for testing global usage
			globals: true,
		},
	}
})
