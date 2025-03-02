import type { BrowserCommands } from '@vitest/browser/context'
import type { CurrentTest } from 'vitest-plugin-vis/client'
import type {
	HasImageSnapshotCommand,
	ImageSnapshotNextIndexCommand,
	MatchImageSnapshotCommand,
	PrepareImageSnapshotComparisonCommand,
	SetupVisSuiteCommand,
	WriteImageSnapshotCommand,
} from 'vitest-plugin-vis/commands'

declare module '@vitest/browser/context' {
	interface BrowserCommands
		extends MatchImageSnapshotCommand,
			HasImageSnapshotCommand,
			PrepareImageSnapshotComparisonCommand,
			ImageSnapshotNextIndexCommand,
			WriteImageSnapshotCommand,
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
		return (browserContext?.commands as any)?.[prop]
	},
})

export const getCurrentTest = () => vitestSuite?.getCurrentTest() as CurrentTest
