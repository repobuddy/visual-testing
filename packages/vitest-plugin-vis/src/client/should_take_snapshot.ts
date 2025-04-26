import type { SnapshotMeta } from '../shared/types.ts'

export function shouldTakeSnapshot(meta: SnapshotMeta<any> | undefined) {
	return document.body.childElementCount > 0 && meta?.enable
}
