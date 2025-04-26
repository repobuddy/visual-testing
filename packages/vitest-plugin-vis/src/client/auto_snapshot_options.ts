import { NAME } from '../shared/constants.ts'
import type { ComparisonMethod, SnapshotMeta } from '../shared/types.ts'
import { ctx } from './ctx.ts'

type Suite = { meta: Record<string, any>; suite?: Suite | undefined }

export type MetaTask =
	| {
			file?: { meta: Record<string, any> } | undefined
			suite?: Suite | undefined
			meta: Record<string, any>
	  }
	| undefined

export function enableAuto() {
	ctx.autoEnabled = true
}

/**
 * Set the snapshot options for auto snapshot.
 *
 * ```ts
 * beforeAll((suite) => setAutoSnapshotOptions(suite, ...))
 * beforeEach(({ task }) => setAutoSnapshotOptions(task, ...))
 *
 * it('...', ({ task }) => {
 *   setAutoSnapshotOptions(task, ...)
 * })
 * ```
 */
export function setAutoSnapshotOptions<M extends ComparisonMethod>(meta: SnapshotMeta<M> | boolean): void {
	const [task, m] = parseArgs(meta)
	if (task)
		task.meta[NAME] = {
			...task.meta[NAME],
			...m,
		}
}

function parseArgs<M extends ComparisonMethod>(
	meta: boolean | SnapshotMeta<M>,
): [MetaTask | undefined, SnapshotMeta<M>] {
	return [ctx.getCurrentTest() ?? (ctx.getCurrentSuite()?.tasks?.[0] as any)?.file, parseMeta(meta)]
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
		{ enable: ctx.autoEnabled },
	)
}
