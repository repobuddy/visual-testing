import type { NAME } from '../shared/constants.ts'
import type { SnapshotMeta } from '../shared/types.ts'

let vitestSuite: Awaited<typeof import('vitest/suite')>

if ((globalThis as any).__vitest_browser__) {
	import('vitest/suite').then((m) => {
		vitestSuite = m
	})
}

export type CurrentTest = ReturnType<typeof vitestSuite.getCurrentTest> & {
	meta: { [NAME]?: SnapshotMeta<'pixel' | 'ssim'> & { isAutoSnapshot?: boolean | undefined } }
}

export const getCurrentTest = () => vitestSuite?.getCurrentTest() as CurrentTest
export const getCurrentSuite = () => vitestSuite?.getCurrentSuite()
