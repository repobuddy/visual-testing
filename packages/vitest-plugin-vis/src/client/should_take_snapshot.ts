import type { SnapshotMeta } from '../shared/types.ts'
import { extractAutoSnapshotOptions } from './auto_snapshot_options.ts'
import { ctx } from './ctx.ts'

/**
 * Determine should snapshot be taken.
 *
 * not story: false
 * no `snapshot` tag: false
 * disabled by `!snapshot` tag: false
 */
export function shouldTakeSnapshot(meta?: SnapshotMeta<any> | undefined) {
	const m = meta ?? extractAutoSnapshotOptions(ctx.getCurrentTest())
	return document.body.childElementCount > 0 && m?.enable
}
