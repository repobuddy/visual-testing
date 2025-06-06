import type { HasImageSnapshotAction } from './has_image_snapshot.ts'
import type { ToMatchImageSnapshotAction } from './to_match_image_snapshot.ts'

declare module '@vitest/browser/context' {
	interface BrowserPage extends HasImageSnapshotAction, ToMatchImageSnapshotAction {}
}
