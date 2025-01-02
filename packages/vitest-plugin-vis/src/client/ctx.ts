import { getCurrentTest } from './vitest_suite_proxy.ts'

export const ctx = {
	getCurrentTest,
	__test__reset() {
		ctx.getCurrentTest = getCurrentTest
	},
}
