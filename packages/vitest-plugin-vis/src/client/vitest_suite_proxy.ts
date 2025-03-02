import type { NAME } from '../shared/constants.ts'
import type { SnapshotMeta } from './snapshot_options.ts'

let vitestSuite: Awaited<typeof import('vitest/suite')>

if ((globalThis as any).__vitest_browser__) {
	import('vitest/suite').then((m) => {
		vitestSuite = m
	})
}

export const getCurrentTest = () =>
	vitestSuite?.getCurrentTest() as ReturnType<typeof vitestSuite.getCurrentTest> & {
		meta: { [NAME]?: SnapshotMeta<'pixel' | 'ssim'> }
	}
export const getCurrentSuite = () => vitestSuite?.getCurrentSuite()
