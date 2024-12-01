import { afterEach, beforeAll, expect } from 'vitest'
import { page } from './@vitest/browser/context.js'
import '../augment.js'
import type { VisOptions } from '../shared/types.js'
import { toMatchImageSnapshot } from './expect.to_match_image_snapshot.js'
import { shouldTakeSnapshot } from './should_take_snapshot.js'
import { state } from './state.js'
import { toMatchImageSnapshot2 } from './to_match_image_snapshot/to_match_image_snapshot.js'

expect.extend({ toMatchImageSnapshot, toMatchImageSnapshot2 })

export function createVisConfig(options?: VisOptions) {
	const h = {
		presets: {
			basic() {
				beforeAll(h.beforeAll)
				afterEach(h.afterEach.matchImageSnapshot)
			},
			theme(themes: Record<string, () => void | Promise<void>>) {
				beforeAll(h.beforeAll)
				afterEach(h.afterEach.matchPerTheme(themes))
			},
		},
		async beforeAll(suite: { file: { filepath: string }; name: string }) {
			return state.setupSuite(suite, options)
		},
		afterEach: {
			async matchImageSnapshot() {
				if (!shouldTakeSnapshot()) return
				// console.debug('taking automatic snapshot', state.getName())
				const r = await page.imageSnapshot()
				expect(r).toMatchImageSnapshot()
			},
			matchPerTheme(themes: Record<string, () => Promise<void> | void>) {
				return async function matchImageSnapshot() {
					if (!shouldTakeSnapshot()) return
					for (const themeId in themes) {
						await themes[themeId]()
						// console.debug('taking automatic snapshot', state.getName(), themeId)
						const r = await page.imageSnapshot({
							customizeSnapshotId: (id) => `${id}-${themeId}`,
						})
						await expect(r).toMatchImageSnapshot()
					}
				}
			},
		},
	}
	return h
}
