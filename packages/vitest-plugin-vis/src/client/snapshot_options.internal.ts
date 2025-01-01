import { NAME } from '../shared/constants.ts'
import type { MetaTask, SnapshotMeta } from './snapshot_options.ts'

export function getAutoSnapshotOptions(task: MetaTask): SnapshotMeta | undefined {
	if (!task) return

	const list: any[] = []
	let current = task
	while (current?.suite) {
		list.unshift(current.suite.meta)
		current = current.suite
	}
	list.unshift(task.file?.meta)
	list.push(task.meta)
	return list.reduce((acc, cur) => {
		if (cur?.[NAME]) {
			const { [NAME]: meta } = cur
			return Object.assign({}, acc, meta)
		}
		return acc
	}, {})
}
