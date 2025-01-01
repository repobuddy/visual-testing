import { NAME } from '../shared/constants.ts'
import { ctx } from './ctx.ts'
import type { ToMatchImageSnapshotOptions } from './expect/to_match_image_snapshot.types.ts'

export type SnapshotMeta = ToMatchImageSnapshotOptions & { enable?: boolean | undefined }

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
export function setAutoSnapshotOptions(task: MetaTask, meta: SnapshotMeta | boolean): void
export function setAutoSnapshotOptions(meta: SnapshotMeta | boolean): void
export function setAutoSnapshotOptions(
	...args: [task: MetaTask, meta: SnapshotMeta | boolean] | [meta: SnapshotMeta | boolean]
): void {
	const [task, meta] = parseArgs(args)
	if (task)
		task.meta[NAME] = {
			...task.meta[NAME],
			...meta,
		}
}

function parseArgs(
	args: [task: MetaTask, meta: SnapshotMeta | boolean] | [meta: boolean | SnapshotMeta],
): [MetaTask | undefined, SnapshotMeta] {
	return args.length === 1 ? [ctx.getCurrentTest(), parseMeta(args[0])] : [args[0], parseMeta(args[1])]
}

function parseMeta(meta: boolean | SnapshotMeta): SnapshotMeta {
	return typeof meta === 'boolean' ? { enable: meta } : { enable: true, ...meta }
}
