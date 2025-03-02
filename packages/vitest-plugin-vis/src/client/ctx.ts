import { getCurrentSuite, getCurrentTest } from './vitest_suite_proxy.ts'

export const ctx = {
	autoEnabled: false,
	getCurrentTest,
	getCurrentSuite,
	__test__reset() {
		ctx.getCurrentTest = getCurrentTest
		ctx.getCurrentSuite = getCurrentSuite
		ctx.autoEnabled = false
	},
}
