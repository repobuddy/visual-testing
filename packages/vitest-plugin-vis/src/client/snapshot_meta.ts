import type { TaskMeta } from 'vitest'
import { NAME } from '../shared/constants.ts'
import type { ToMatchImageSnapshotOptions } from './expect/to_match_image_snapshot.types.ts'
import type { MetaTask } from './snapshot_meta.internal.ts'

export type SnapshotMeta = ToMatchImageSnapshotOptions & { enable?: boolean | undefined }

/**
 * Set the snapshot options for auto snapshot.
 *
 * ```ts
 * beforeEach(({ task }) => setAutoSnapshotOptions(task, ...))
 *
 * it('...', ({ task }) => {
 *   setAutoSnapshotOptions(task, ...)
 * })
 * ```
 */
export function setAutoSnapshotOptions(
	task:
		| {
				file: { meta: TaskMeta }
				meta: TaskMeta
		  }
		| undefined,
	meta: SnapshotMeta | boolean = true,
) {
	if (!task) return
	if (typeof meta === 'boolean') meta = { enable: meta }
	else {
		meta = {
			enable: true,
			...meta,
		}
	}
	;(task.meta as any)[NAME] = meta
}

export function getAutoSnapshotOptions(task: MetaTask): SnapshotMeta | undefined {
	if (!task) return

	const l: any[] = []
	let t = task
	while (t?.suite) {
		l.unshift(t.suite.meta)
		t = t.suite
	}
	l.unshift(task.file?.meta)
	l.push(task.meta)
	return l.reduce((acc, cur) => {
		if (cur?.[NAME]) {
			const { [NAME]: meta } = cur
			return Object.assign({}, acc, meta)
		}
		return acc
	}, {})
}
