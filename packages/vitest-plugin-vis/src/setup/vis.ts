import { commands } from '@vitest/browser/context'
import dedent from 'dedent'
import { afterEach, beforeAll, expect } from 'vitest'
import { ctx } from '../client/ctx.ts'
import { shouldTakeSnapshot } from '../client/should_take_snapshot.ts'
import { getAutoSnapshotOptions } from '../client/snapshot_meta.internal.ts'
import { toTaskId } from '../client/task_id.ts'

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
			const meta = getAutoSnapshotOptions(ctx.getCurrentTest())
			if (!shouldTakeSnapshot(meta)) return
			await expect(document.body).toMatchImageSnapshot(meta)
		},
		matchPerTheme(themes: Record<string, () => Promise<void> | void>) {
			return async function matchImageSnapshot() {
				const test = ctx.getCurrentTest()
				const meta = getAutoSnapshotOptions(test)
				if (!shouldTakeSnapshot(meta)) return

				const errors: any[] = []
				for (const themeId in themes) {
					try {
						await themes[themeId]!()
						await expect(document.body).toMatchImageSnapshot({
							...meta,
							customizeSnapshotId: (id) => `${id}-${themeId}`,
						})
					} catch (error) {
						errors.push([themeId, error])
					}
				}
				if (errors.length > 0) {
					if (errors.length === 1) throw errors[0][1]
					const taskId = toTaskId(test!)
					throw new AggregateError(
						errors,
						dedent`Snapshot \`${taskId}\` mismatched

						${errors
							.map(([themeId, error]) => {
								return `Theme \`${themeId}\` failed: ${error.message}`
							})
							.join('\n')}`,
					)
				}
			}
		},
	},
}
