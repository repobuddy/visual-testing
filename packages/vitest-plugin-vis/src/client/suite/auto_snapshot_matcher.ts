import dedent from 'dedent'
import { extractAutoSnapshotOptions } from '../../auto_snapshots/_extract_auto_snapshot_options.ts'
import type { SnapshotMeta } from '../../auto_snapshots/snapshot_meta.ts'
import type { SetupVisSuiteCommand } from '../../shared/commands.types.ts'
import type { ComparisonMethod } from '../../shared/types.ts'
import { matchPageImageSnapshotAction } from '../actions/match_page_image_snapshot_action.ts'
import type { MatchPageImageSnapshotActionCommands } from '../actions/match_page_image_snapshot_action.ts'
import { shouldTakeSnapshot } from '../snapshot/should_take_snapshot.ts'
import { toTaskId } from '../task/task_id.ts'
import { ctx } from './_ctx.ts'

export function autoSnapshotMatcher<GM extends Record<string, any> | unknown = unknown>(
	commands: SetupVisSuiteCommand,
	expect: any,
) {
	let subject: string | undefined

	return {
		async setup() {
			subject = (await commands.setupVisSuite()).subject
		},
		createMatcher<C extends ComparisonMethod, M extends Record<string, any> | unknown = unknown>(
			themes: Record<
				string,
				boolean | ((options: SnapshotMeta<C> & M & GM) => Promise<boolean> | Promise<void> | boolean | void)
			>,
		) {
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
						const snapshotKey = meta?.snapshotKey ?? themeId
						const options = { ...meta, snapshotKey }
						if (meta?.fullPage) {
							await matchPageImageSnapshotAction(
								commands as MatchPageImageSnapshotActionCommands,
								toTaskId(test!),
								options,
							)
						} else {
							await expect(getSubject(meta?.subject ?? subject)).toMatchImageSnapshot(options)
						}
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
	}
}

function getSubject(selectors: string | undefined) {
	return selectors ? (document.querySelector(selectors) ?? document.body) : document.body
}
