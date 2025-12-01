import { assertSnapshotKeyWithoutDash } from '../../shared/asserts.ts'
import { NAME } from '../../shared/constants.ts'
import type { ComparisonMethod } from '../../shared/types.ts'
import { ctx } from '../ctx.ts'
import type { SnapshotMeta } from './snapshot_meta.ts'

type Suite = { meta: Record<string, any>; suite?: Suite | undefined }

export type MetaTask =
	| {
			file?: { meta: Record<string, any> } | undefined
			suite?: Suite | undefined
			meta: Record<string, any>
	  }
	| undefined

/**
 * Set the snapshot options for auto snapshot.
 *
 * You can use it in beforeAll, beforeEach, or individual test cases.
 *
 * @param meta - The snapshot options to set.
 * You can pass a boolean to enable/disable the snapshot, or an object with the snapshot options.
 * When passing an object, the `enable` property will be set to `true` by default unless you explicitly set it to `false`.
 * @param meta.enable - Whether to enable the snapshot.
 * @param meta.snapshotKey - The key to use for the snapshot.
 * @param meta.comparisonMethod - The comparison method to use for the snapshot.
 * @param meta.diffOptions - The diff options to use for the snapshot.
 * @param meta.failureThreshold - The failure threshold to use for the snapshot.
 * @param meta.failureThresholdType - The failure threshold type to use for the snapshot.
 * @param meta.timeout - The timeout to use for the snapshot.
 *
 * @example
 *
 * ```ts
 * beforeAll(() => setAutoSnapshotOptions(...))
 * beforeEach(() => setAutoSnapshotOptions(...))
 *
 * it('...', () => {
 *   setAutoSnapshotOptions(...)
 * })
 * ```
 */
export function setAutoSnapshotOptions<M extends ComparisonMethod>(meta: boolean | SnapshotMeta<M>): void {
	if (typeof meta === 'object') {
		assertSnapshotKeyWithoutDash(meta.snapshotKey)
	}

	const task = getTask()
	if (!task) return

	task.meta[NAME] = {
		...task.meta[NAME],
		...parseMeta(meta),
	}
}

function getTask(): MetaTask | undefined {
	return ctx.getCurrentTest() ?? (ctx.getCurrentSuite()?.tasks?.[0] as any)?.file
}

function parseMeta<M extends ComparisonMethod>(meta: boolean | SnapshotMeta<M>): SnapshotMeta<M> {
	return typeof meta === 'boolean' ? ({ enable: meta } as any) : { enable: true, ...meta }
}

export function extractAutoSnapshotOptions<M extends SnapshotMeta<any> = SnapshotMeta<any>>(
	task: MetaTask,
): M | undefined {
	if (!task) return

	const list: any[] = []
	let current = task
	while (current?.suite) {
		list.unshift(current.suite.meta)
		current = current.suite
	}
	list.unshift(task.file?.meta)
	list.push(task.meta)
	return list.reduce(
		(acc, cur) => {
			const meta = cur?.[NAME]
			return meta ? Object.assign({}, acc, meta) : acc
		},
		{ enable: false },
	)
}
