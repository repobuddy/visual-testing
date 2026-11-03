import { describe, it } from 'vitest'
import addonVis from '../index.ts'

/**
 * The CSF Next setup in the docs is `definePreview({ addons: [addonVis({ auto: true })] })`
 * with no `vitest.setup.ts`. Storybook's Vitest addon loads the preview annotations,
 * so the addon must carry everything automatic snapshots need.
 *
 * End to end: `testcases/sb-csf-next` configures `addonVis()` in `definePreview()` and has no `setupFiles`.
 */
describe('addonVis()', () => {
	it('adds the snapshot tag to every story when auto is true', ({ expect }) => {
		expect((addonVis({ auto: true }) as any).tags).toEqual(['snapshot'])
	})

	it('does not add the snapshot tag by default', ({ expect }) => {
		expect((addonVis() as any).tags).toEqual([])
	})

	it('does not add the snapshot tag when auto is customized', ({ expect }) => {
		expect((addonVis({ auto: { dark() {} } }) as any).tags).toEqual([])
	})

	it('provides the hooks that take the snapshot, so vitest.setup.ts is not needed', ({ expect }) => {
		const addon = addonVis({ auto: true }) as any
		expect(typeof addon.beforeAll).toBe('function')
		expect(typeof addon.beforeEach).toBe('function')
		expect(typeof addon.afterEach).toBe('function')
	})
})
