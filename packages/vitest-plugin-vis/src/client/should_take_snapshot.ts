import { hasRenderContent } from './browser/has_render_content.ts'
import type { SnapshotMeta } from './snapshot_meta.ts'

export function shouldTakeSnapshot(meta: SnapshotMeta<any> | undefined) {
	return hasRenderContent() && meta?.enable
}
