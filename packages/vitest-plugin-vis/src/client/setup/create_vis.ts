import dedent from 'dedent'
import { afterEach, beforeAll } from 'vitest'
import type { SetupVisSuiteCommand } from '../../server/commands/setup_vis_suite.ts'
import type { ComparisonMethod } from '../../shared/types.ts'
import { extractAutoSnapshotOptions, setAutoSnapshotOptions } from '../auto_snapshot_options.ts'
import { ctx } from '../ctx.ts'
import { shouldTakeSnapshot } from '../should_take_snapshot.ts'
import type { SnapshotMeta } from '../snapshot_meta.ts'
import { toTaskId } from '../task_id.ts'

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
	setup(options?: {
		auto?:
			| boolean
			| (<C extends ComparisonMethod, M extends Record<string, any> | unknown = unknown>(
					options: SnapshotMeta<C> & M & GM,
			  ) => boolean | Promise<boolean>)
			| Record<
					string,
					| boolean
					| (<C extends ComparisonMethod, M extends Record<string, any> | unknown = unknown>(
							options: SnapshotMeta<C> & M & GM,
					  ) => boolean | Promise<boolean>)
			  >
	}): void
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
	let subjectDataTestId: string | undefined

	const vis: VisClientConfigurator<GM> = {
		setup(options) {
			if (!options || options.auto === false) {
				beforeAll(vis.beforeAll.setup)
			} else {
				beforeAll(async () => {
					await vis.beforeAll.setup()
					setAutoSnapshotOptions(true)
				})
			}

			if (typeof options?.auto === 'function') {
				afterEach(
					vis.afterEach.matchPerTheme({
						auto: options.auto,
					}),
				)
			} else if (typeof options?.auto === 'object') {
				afterEach(vis.afterEach.matchPerTheme(options.auto))
			} else {
				afterEach(vis.afterEach.matchImageSnapshot)
			}
		},
		presets: {
			enable() {
				beforeAll(vis.beforeAll.setup)
				afterEach(vis.afterEach.matchImageSnapshot)
			},
			manual() {
				beforeAll(vis.beforeAll.setup)
			},
			auto() {
				beforeAll(async () => {
					await vis.beforeAll.setup()
					setAutoSnapshotOptions(true)
				})
				afterEach(vis.afterEach.matchImageSnapshot)
			},
			theme(themes) {
				beforeAll(async () => {
					await vis.beforeAll.setup()
					setAutoSnapshotOptions(true)
				})
				afterEach(vis.afterEach.matchPerTheme(themes))
			},
		},
		beforeAll: {
			async setup() {
				subjectDataTestId = (await commands.setupVisSuite()).subject
			},
		},
		afterEach: {
			async matchImageSnapshot() {
				return vis.afterEach.matchPerTheme({ async auto() {} })()
			},
			matchPerTheme(themes) {
				return async function matchImageSnapshot() {
					const test = ctx.getCurrentTest()
					if ((test?.result?.errors?.length ?? 0) > 0) return

					const meta = extractAutoSnapshotOptions(test)
					if (!shouldTakeSnapshot(meta)) return
					const errors: Array<[string, Error]> = []
					for (const themeId in themes) {
						try {
							await new Promise((a) => setTimeout(a, 10))
							const theme = themes[themeId]
							const r = typeof theme === 'function' ? await theme(meta! as any) : theme
							if (r === false) continue
							const subject = getSubject(meta?.subject ?? subjectDataTestId)
							await test!.context.expect(subject).toMatchImageSnapshot({
								...meta,
								snapshotKey: meta?.snapshotKey ?? themeId,
							})
						} catch (error) {
							errors.push([themeId, error as Error])
						}
					}
					if (errors.length > 0) {
						if (errors.length === 1) throw errors[0]![1]
						const taskId = toTaskId(test!)
						throw new AggregateError(
							errors,
							dedent`Snapshot \`${taskId}\` mismatched

						${errors
							.map(([themeId, error]) => {
								return `Theme \`${themeId}\` failed: ${error.message}`
							})
							.join('\n\n')}`,
						)
					}
				}
			},
		},
	}
	return vis
}

function getSubject(subject: string | undefined) {
	return subject ? (document.querySelector(subject) ?? document.body) : document.body
}
