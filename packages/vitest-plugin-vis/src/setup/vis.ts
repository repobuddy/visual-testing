import { commands } from '@vitest/browser/context'
import { afterEach, beforeAll } from 'vitest'

/**
 * Visual test configuration on the client side.
 */
export const vis = {
	presets: {
		/**
		 * Enable manual visual testing.
		 */
		manual() {
			beforeAll(vis.beforeAll.setup)
		},
		/**
		 * Enable automatic visual testing.
		 *
		 * This will take a snapshot after each test.
		 */
		auto() {
			beforeAll(vis.beforeAll.setup)
			afterEach(vis.afterEach.matchImageSnapshot)
		},
		/**
		 * Enable automatic visual testing with multiple themes.
		 *
		 * This will take a snapshot after each test for each theme.
		 *
		 * @param themes A record of theme names and their setup functions.
		 *
		 * @example
		 * ```ts
		 * vis().presets.theme({
		 *  light() { document.body.classList.add('light') },
		 *  dark() { document.body.classList.add('dark') },
		 * })
		 * ```
		 */
		theme(themes: Record<string, () => void | Promise<void>>) {
			beforeAll(vis.beforeAll.setup)
			afterEach(vis.afterEach.matchPerTheme(themes))
		},
	},
	beforeAll: {
		async setup() {
			await commands.setupVisSuite()
		},
	},
	afterEach: {
		async matchImageSnapshot() {
			// if (!shouldTakeSnapshot()) return
			// const r = await page.imageSnapshot()
			// await expect(r).toMatchImageSnapshot()
		},
		matchPerTheme(_themes: Record<string, () => Promise<void> | void>) {
			return async function matchImageSnapshot() {
				// if (!shouldTakeSnapshot()) return
				// for (const themeId in themes) {
				// 	await themes[themeId]()
				// 	// console.debug('taking automatic snapshot', state.getName(), themeId)
				// 	const r = await page.imageSnapshot({
				// 		customizeSnapshotId: (id) => `${id}-${themeId}`,
				// 	})
				// 	await expect(r).toMatchImageSnapshot()
				// }
			}
		},
	},
}
