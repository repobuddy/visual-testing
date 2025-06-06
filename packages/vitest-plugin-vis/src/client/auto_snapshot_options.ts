import { assertSnapshotKeyWithoutDash } from '../shared/asserts.ts'
import { NAME } from '../shared/constants.ts'
import type { ComparisonMethod } from '../shared/types.ts'
import { ctx } from './ctx.ts'
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
 * ```ts
 * beforeAll(() => setAutoSnapshotOptions(...))
 * beforeEach(() => setAutoSnapshotOptions(...))
 *
 * it('...', () => {
 *   setAutoSnapshotOptions(...)
 * })
 * ```
 */
export function setAutoSnapshotOptions<M extends ComparisonMethod>(meta: SnapshotMeta<M> | boolean): void {
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
