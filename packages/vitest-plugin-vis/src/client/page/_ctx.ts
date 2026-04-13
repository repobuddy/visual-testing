import { commands, type BrowserCommands, type BrowserPage } from 'vitest/browser'
import { getCurrentTest } from '../external/vitest/vitest_suite_proxy.ts'

export type { BrowserPage }

export const ctx = {
	commands: commands as BrowserCommands,
	getCurrentTest,
	__test__reset() {
		ctx.getCurrentTest = getCurrentTest
	},
}
