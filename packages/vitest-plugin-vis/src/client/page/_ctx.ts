import { type BrowserPage, commands } from 'vitest/browser'
import { getCurrentTest } from '../external/vitest/vitest_suite_proxy.ts'

export type { BrowserPage }

export const ctx = {
	commands,
	getCurrentTest,
	__test__reset() {
		ctx.getCurrentTest = getCurrentTest
	},
}
