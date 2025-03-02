import dedent from 'dedent'
import { afterEach, beforeAll } from 'vitest'
import { type SnapshotMeta, setAutoSnapshotOptions, toTaskId } from '../client.ts'
import { ctx } from '../client/ctx.ts'
import { shouldTakeSnapshot } from '../client/should_take_snapshot.ts'
import { enableAuto, getAutoSnapshotOptions } from '../client/snapshot_options.ts'
import type { SetupVisSuiteCommand } from '../server/commands/setup_vis_suite.ts'

/**
 * Visual test configuration on the client side.
 */
export type VisClientConfigurator<M extends SnapshotMeta<any>> = {
	presets: {
		/**
		 * Enable visual testing.
		 *
		 * auto snapshot is turned off by default.
		 * You can specify the test to take a snapshot during `afterEach()` hook with `setAutoSnapshotOptions()`.
		 */
		enable(): void
		/**
		 * Enable visual testing.
		 *
		 * `setAutoSnapshotOptions` will have no effect in this preset.
		 */
		manual(): void
		/**
		 * Enable automatic visual testing.
		 *
		 * This will take a snapshot after each test.
		 */
		auto(): void
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
		theme(themes: Record<string, (options: M) => Promise<boolean> | Promise<void> | boolean | void>): void
	}
	beforeAll: {
		setup(): Promise<void>
	}
	afterEach: {
		matchImageSnapshot(): Promise<void>
		matchPerTheme(
			themes: Record<string, (options: M) => Promise<boolean> | Promise<void> | boolean | void>,
		): () => Promise<void>
	}
}

export function createVis<M extends SnapshotMeta<any>>(commands: SetupVisSuiteCommand) {
	let subjectDataTestId: string | undefined

	const vis: VisClientConfigurator<M> = {
		presets: {
			enable() {
				beforeAll(vis.beforeAll.setup)
				afterEach(vis.afterEach.matchImageSnapshot)
			},
			manual() {
				beforeAll(vis.beforeAll.setup)
			},
			auto() {
				beforeAll(vis.beforeAll.setup)
				afterEach(vis.afterEach.matchImageSnapshot)
				enableAuto()
			},
			theme(themes: Record<string, (options: M) => Promise<boolean> | Promise<void> | boolean | void>) {
				beforeAll(vis.beforeAll.setup)
				afterEach(vis.afterEach.matchPerTheme(themes))
			},
		},
		beforeAll: {
			async setup() {
				subjectDataTestId = (await commands.setupVisSuite()).subjectDataTestId
			},
		},
		afterEach: {
			async matchImageSnapshot() {
				const test = ctx.getCurrentTest()

				if ((test?.result?.errors?.length ?? 0) > 0) return

				const meta = getAutoSnapshotOptions(test)
				if (!shouldTakeSnapshot(meta)) return

				await test!.context.expect(getSubject(meta?.subjectDataTestId ?? subjectDataTestId)).toMatchImageSnapshot(meta)
			},
			matchPerTheme(themes: Record<string, (options: M) => Promise<boolean> | Promise<void> | boolean | void>) {
				return async function matchImageSnapshot() {
					const test = ctx.getCurrentTest()
					if ((test?.result?.errors?.length ?? 0) > 0) return

					const meta = getAutoSnapshotOptions<M>(test)
					if (!shouldTakeSnapshot(meta)) return
					const errors: any[] = []
					for (const themeId in themes) {
						try {
							await new Promise((a) => setTimeout(a, 10))
							const r = await themes[themeId]!(meta!)
							if (r === false) continue
							await test!.context
								.expect(getSubject(meta?.subjectDataTestId ?? subjectDataTestId))
								.toMatchImageSnapshot({
									...meta,
									customizeSnapshotId: meta?.customizeSnapshotId
										? ({ id, index }) => `${meta.customizeSnapshotId!({ id, index })}-${themeId}`
										: ({ id }) => `${id}-${themeId}`,
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
							.join('\n\n')}`,
						)
					}
				}
			},
		},
	}
	return vis
}

function getSubject(subjectDataTestId: string | undefined) {
	if (subjectDataTestId) {
		const subject = document.querySelector(`[data-testid="${subjectDataTestId}"]`)
		if (subject) return subject
	}

	return document.body
}
