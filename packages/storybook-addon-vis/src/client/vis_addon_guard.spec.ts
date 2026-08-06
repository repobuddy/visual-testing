import { describe, it } from 'vitest'
import addonVis from '../index.ts'
import { visAnnotations } from '../preview/vis_annotation.ts'

/**
 * Regression tests for #829.
 *
 * Outside a vitest browser run the `vitest_proxy` `commands` proxy is empty, so
 * reaching the snapshot setup threw `commands.setupVisSuite is not a function`
 * and the Storybook preview failed to render. Both hooks must no-op instead.
 */
describe('outside a vitest browser run', () => {
	/** Await `fn` with `__vitest_browser__` removed, restoring it afterwards. */
	async function withoutVitestBrowser(fn: () => unknown) {
		const g = globalThis as any
		const saved = g.__vitest_browser__
		delete g.__vitest_browser__
		try {
			return await fn()
		} finally {
			g.__vitest_browser__ = saved
		}
	}

	it('beforeAll no-ops instead of reaching for vitest commands', async ({ expect }) => {
		const addon = addonVis({ auto: true, createMissingBaseline: true }) as any

		await withoutVitestBrowser(async () => {
			await expect(addon.beforeAll()).resolves.toBeUndefined()
		})
	})

	it('beforeEach no-ops instead of reaching for the current test', async ({ expect }) => {
		await withoutVitestBrowser(() => {
			expect(() => visAnnotations.beforeEach({ tags: ['snapshot'], parameters: {} } as any)).not.toThrow()
		})
	})
})
