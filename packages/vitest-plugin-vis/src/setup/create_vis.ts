import { afterEach, beforeAll, expect } from 'vitest'
import { setAutoSnapshotOptions } from '../auto_snapshots/auto_snapshot_options.ts'
import { autoSnapshotMatcher } from '../client/suite/auto_snapshot_matcher.ts'
import type { SetupVisSuiteCommand } from '../shared/commands.types.ts'
import type { SetupVisOptions } from '../shared/types.ts'

/**
 * Visual test configuration on the client side.
 */
export type VisClientConfigurator<GM extends Record<string, any> | unknown = unknown> = {
	/**
	 * Setup the visual test configuration.
	 *
	 * @example
	 * ```ts
	 * // Setup with auto snapshot enabled
	 * vis().setup({ auto: true })
	 *
	 * // Setup with auto snapshot disabled
	 * vis().setup({ auto: false })
	 *
	 * // Same as `vis.setup({ auto: false })`
	 * vis.setup()
	 *
	 * // Setup with auto snapshot determined by the test meta
	 * vis.setup({
	 * 	auto: async ({ meta }) => meta['darkOnly'],
	 * })
	 *
	 * // Setup with multiple auto snapshots
	 * vis.setup({
	 *   auto: {
	 *     async light() { document.body.classList.remove('dark') },
	 *     async dark() { document.body.classList.add('dark') },
	 *   }
	 * })
	 * ```
	 */
	setup(options?: SetupVisOptions<GM>): void
}

export function createVis<GM extends Record<string, any> | unknown = unknown>(commands: SetupVisSuiteCommand) {
	const matcher = autoSnapshotMatcher(commands, expect)

	const vis: VisClientConfigurator<GM> = {
		setup(options) {
			if (!options || options.auto === false) {
				beforeAll(matcher.setup)
			} else {
				beforeAll(async () => {
					await matcher.setup()
					setAutoSnapshotOptions(true)
				})
			}

			if (typeof options?.auto === 'function') {
				afterEach(matcher.createMatcher({ auto: options.auto }))
			} else if (typeof options?.auto === 'object') {
				afterEach(matcher.createMatcher(options.auto))
			} else {
				afterEach(matcher.createMatcher({ async auto() {} }))
			}
		},
	}
	return vis
}
