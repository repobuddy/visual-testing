import { afterEach, beforeAll, expect } from 'vitest'
import { autoSnapshotMatcher } from '../client/suite/auto_snapshot_matcher.ts'
import { setAutoSnapshotOptions } from '../client/task/auto_snapshot_options.ts'
import type { SnapshotMeta } from '../client/task/snapshot_meta.ts'
import type { SetupVisSuiteCommand } from '../shared/commands.types.ts'
import type { ComparisonMethod, SetupVisOptions } from '../shared/types.ts'

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
	/**
	 * @deprecated Use `vis.setup()` instead.
	 */
	presets: {
		/**
		 * @deprecated Use `vis.setup()` instead.
		 *
		 * Enable visual testing.
		 *
		 * auto snapshot is turned off by default.
		 * You can specify the test to take a snapshot during `afterEach()` hook with `setAutoSnapshotOptions()`.
		 */
		enable(): void
		/**
		 * @deprecated Use `vis.setup()` instead.
		 *
		 * Enable visual testing.
		 *
		 * `setAutoSnapshotOptions` will have no effect in this preset.
		 */
		manual(): void
		/**
		 * @deprecated Use `vis.setup()` instead.
		 *
		 * Enable automatic visual testing.
		 *
		 * This will take a snapshot after each test.
		 */
		auto(): void
		/**
		 * @deprecated Use `vis.setup()` instead.
		 *
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
		theme<C extends ComparisonMethod, M extends Record<string, any> | unknown = unknown>(
			themes: Record<
				string,
				boolean | ((options: SnapshotMeta<C> & M & GM) => Promise<boolean> | Promise<void> | boolean | void)
			>,
		): void
	}
	beforeAll: {
		setup(): Promise<void>
	}
	afterEach: {
		matchImageSnapshot(): Promise<void>
		matchPerTheme<C extends ComparisonMethod, M extends Record<string, any> | unknown = unknown>(
			themes: Record<
				string,
				boolean | ((options: SnapshotMeta<C> & M & GM) => Promise<boolean> | Promise<void> | boolean | void)
			>,
		): () => Promise<void>
	}
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
				afterEach(
					matcher.createMatcher({
						auto: options.auto,
					}),
				)
			} else if (typeof options?.auto === 'object') {
				afterEach(matcher.createMatcher(options.auto))
			} else {
				afterEach(matcher.createMatcher({ async auto() {} }))
			}
		},
		presets: {
			enable() {
				beforeAll(matcher.setup)
				afterEach(matcher.createMatcher({ async auto() {} }))
			},
			manual() {
				beforeAll(matcher.setup)
			},
			auto() {
				beforeAll(async () => {
					await matcher.setup()
					setAutoSnapshotOptions(true)
				})
				afterEach(matcher.createMatcher({ async auto() {} }))
			},
			theme(themes) {
				beforeAll(async () => {
					await matcher.setup()
					setAutoSnapshotOptions(true)
				})
				afterEach(matcher.createMatcher(themes))
			},
		},
		beforeAll: {
			async setup() {
				await matcher.setup()
			},
		},
		afterEach: {
			async matchImageSnapshot() {
				return matcher.createMatcher({ async auto() {} })()
			},
			matchPerTheme(themes) {
				return matcher.createMatcher(themes)
			},
		},
	}
	return vis
}
