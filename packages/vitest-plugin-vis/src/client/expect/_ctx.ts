import { commands } from 'vitest/browser'
import { getCurrentTest } from '../external/vitest/vitest_suite_proxy.ts'

export const ctx = {
	commands,
	getCurrentTest,
	__test__reset() {
		ctx.getCurrentTest = getCurrentTest
	},
}
