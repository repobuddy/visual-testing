import { getCurrentSuite, getCurrentTest } from './vitest_suite_proxy.ts'

export const ctx = {
	autoEnabled: undefined as boolean | undefined,
	getCurrentTest,
	getCurrentSuite,
	__test__reset() {
		ctx.getCurrentTest = getCurrentTest
		ctx.getCurrentSuite = getCurrentSuite
		ctx.autoEnabled = undefined
	},
}
