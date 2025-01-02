import type { BrowserCommands } from '@vitest/browser/context'
import type {
	HasImageSnapshotCommand,
	ImageSnapshotNextIndexCommand,
	MatchImageSnapshotCommand,
	SetupVisSuiteCommand,
} from 'vitest-plugin-vis/commands'

declare module '@vitest/browser/context' {
	interface BrowserCommands
		extends MatchImageSnapshotCommand,
			HasImageSnapshotCommand,
			ImageSnapshotNextIndexCommand,
			SetupVisSuiteCommand {}
}

let browserContext: Awaited<typeof import('@vitest/browser/context')>
let vitestSuite: Awaited<typeof import('vitest/suite')>

if ((globalThis as any).__vitest_browser__) {
	import('@vitest/browser/context').then((m) => {
		browserContext = m
	})
	import('vitest/suite').then((m) => {
		vitestSuite = m
	})
}

export const commands = new Proxy<BrowserCommands>({} as any, {
	get(_target, prop) {
		return (
			(browserContext?.commands as any)?.[prop] ??
			/* v8 ignore start : used in storybook, not in vitest */
			(() => {
				throw new Error(`Command '${String(prop)}' not found`)
			})()
			/* v8 ignore end */
		)
	},
})

export const getCurrentTest = () => vitestSuite?.getCurrentTest()
