import type { CurrentTest } from '../shared/types.ts'

let vitestSuite: Awaited<typeof import('vitest/suite')>

if ((globalThis as any).__vitest_browser__) {
	import('vitest/suite').then((m) => {
		vitestSuite = m
	})
}

export const getCurrentTest = () => vitestSuite?.getCurrentTest() as CurrentTest
export const getCurrentSuite = () => vitestSuite?.getCurrentSuite()
