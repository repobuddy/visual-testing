import { describe, it } from 'vitest'
import { isVitestBrowser } from './is_vitest_browser.ts'

/**
 * Run the callback with `__vitest_browser__` removed, restoring it afterwards.
 * Stands in for a plain browser (e.g. an agent driving Storybook dev over
 * headless Chrome), which is the case #829 reported.
 */
function withoutVitestBrowser(fn: () => void) {
	const g = globalThis as any
	const saved = g.__vitest_browser__
	delete g.__vitest_browser__
	try {
		fn()
	} finally {
		g.__vitest_browser__ = saved
	}
}

describe('isVitestBrowser', () => {
	it('returns true when the vitest browser global is present', ({ expect }) => {
		expect(isVitestBrowser()).toBe(true)
	})

	it('returns false when the vitest browser global is absent', ({ expect }) => {
		withoutVitestBrowser(() => {
			expect(isVitestBrowser()).toBe(false)
		})
	})

	it('reads the global on each call, not at module load', ({ expect }) => {
		withoutVitestBrowser(() => {
			expect(isVitestBrowser()).toBe(false)
		})
		expect(isVitestBrowser()).toBe(true)
	})
})
