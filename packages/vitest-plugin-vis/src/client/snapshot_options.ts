import { NAME } from '../shared/constants.ts'
import type { AutoSnapshotOptions, ComparisonMethod } from '../shared/types.ts'
import { ctx } from './ctx.ts'
import type { ToMatchImageSnapshotOptions } from './expect/to_match_image_snapshot.types.ts'

export type SnapshotMeta<M extends ComparisonMethod> = ToMatchImageSnapshotOptions<M> &
	AutoSnapshotOptions & {
		enable?: boolean | undefined
		[key: string]: unknown
	}

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
 *
 * @param task Optional. Suite or task to set the options.
 * If not provided, it will set the options for the current test.
 */
export function setAutoSnapshotOptions<M extends ComparisonMethod>(
	task: MetaTask,
	meta: SnapshotMeta<M> | boolean,
): void
export function setAutoSnapshotOptions<M extends ComparisonMethod>(meta: SnapshotMeta<M> | boolean): void
export function setAutoSnapshotOptions<M extends ComparisonMethod>(
	...args: [task: MetaTask, meta: SnapshotMeta<M> | boolean] | [meta: SnapshotMeta<M> | boolean]
): void {
	const [task, meta] = parseArgs(args)
	if (task)
		task.meta[NAME] = {
			...task.meta[NAME],
			...meta,
		}
}

function parseArgs<M extends ComparisonMethod>(
	args: [task: MetaTask, meta: SnapshotMeta<M> | boolean] | [meta: boolean | SnapshotMeta<M>],
): [MetaTask | undefined, SnapshotMeta<M>] {
	return args.length === 1
		? [ctx.getCurrentTest() ?? (ctx.getCurrentSuite().tasks?.[0] as any)?.file, parseMeta(args[0])]
		: [args[0], parseMeta(args[1])]
}

function parseMeta<M extends ComparisonMethod>(meta: boolean | SnapshotMeta<M>): SnapshotMeta<M> {
	return typeof meta === 'boolean' ? ({ enable: meta } as any) : { enable: true, ...meta }
}

export function getAutoSnapshotOptions<M extends SnapshotMeta<any> = SnapshotMeta<any>>(task: MetaTask): M | undefined {
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
			if (meta) {
				return Object.assign({}, acc, meta)
			}
			return acc
		},
		{ enable: ctx.autoEnabled },
	)
}
