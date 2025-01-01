import { ctx } from './ctx.ts'
import { getAutoSnapshotOptions } from './snapshot_options.internal.ts'
import type { SnapshotMeta } from './snapshot_options.ts'

/**
 * Determine should snapshot be taken.
 *
 * not story: false
 * no `snapshot` tag: false
 * disabled by `!snapshot` tag: false
 */
export function shouldTakeSnapshot(meta?: SnapshotMeta | undefined) {
	const m = meta ?? getAutoSnapshotOptions(ctx.getCurrentTest())
	return document.body.childElementCount > 0 && m?.enable !== false
}
