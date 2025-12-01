import { hasRenderContent } from '../external/browser/has_render_content.ts'
import type { SnapshotMeta } from '../task/snapshot_meta.ts'

export function shouldTakeSnapshot(meta: SnapshotMeta<any> | undefined) {
	return hasRenderContent() && meta?.enable
}
