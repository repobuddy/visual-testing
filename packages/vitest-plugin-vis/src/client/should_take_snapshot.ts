import type { SnapshotMeta } from './snapshot_meta.ts'

export function shouldTakeSnapshot(meta: SnapshotMeta<any> | undefined) {
	return document.body.childElementCount > 0 && meta?.enable
}
