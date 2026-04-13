import type { SnapshotTestMeta } from '../../../shared/types.ts'

let vitest: Awaited<typeof import('vitest')>

if ((globalThis as any).__vitest_browser__) {
	import('vitest').then((m) => {
		vitest = m
	})
}

export type CurrentTest = ReturnType<typeof vitest.TestRunner.getCurrentTest> & SnapshotTestMeta

export const getCurrentTest = () => vitest?.TestRunner.getCurrentTest() as CurrentTest
export const getCurrentSuite = () => vitest?.TestRunner.getCurrentSuite()
