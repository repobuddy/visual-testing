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

let ctx: Awaited<typeof import('@vitest/browser/context')>

if ((globalThis as any).__vitest_browser__) {
	import('@vitest/browser/context').then((m) => {
		ctx = m
	})
}

export const commands = new Proxy<BrowserCommands>({} as any, {
	get(_target, prop) {
		return (
			(ctx?.commands as any)?.[prop] ??
			/* v8 ignore start : used in storybook, not in vitest */
			(() => {
				throw new Error(`Command '${String(prop)}' not found`)
			})()
			/* v8 ignore end */
		)
	},
})
