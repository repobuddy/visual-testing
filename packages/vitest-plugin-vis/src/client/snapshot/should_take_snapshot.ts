import type { SnapshotMeta } from '../../auto_snapshots/snapshot_meta.ts'
import { hasRenderContent } from '../external/browser/has_render_content.ts'

export function shouldTakeSnapshot(meta: SnapshotMeta<any> | undefined) {
	return hasRenderContent() && meta?.enable
}
