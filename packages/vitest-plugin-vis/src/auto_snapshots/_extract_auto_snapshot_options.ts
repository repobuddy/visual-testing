import { NAME } from '../client-api.ts'
import type { MetaTask } from './auto_snapshot_options.ts'
import type { SnapshotMeta } from './snapshot_meta.ts'

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
			// biome-ignore lint/performance/noAccumulatingSpread: I think this is needed
			return meta ? Object.assign({}, acc, meta) : acc
		},
		{ enable: false },
	)
}
