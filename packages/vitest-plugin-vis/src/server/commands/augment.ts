import type { HasImageSnapshotCommand } from './has_image_snapshot.ts'
import type { ImageSnapshotNextIndexCommand } from './image_snapshot_next_index.ts'
import type { PrepareImageSnapshotComparisonCommand } from './prepare_image_snapshot_comparison.ts'
import type { PreparePageImageSnapshotComparisonCommand } from './prepare_page_image_snapshot_comparison.ts'
import type { SetupVisSuiteCommand } from './setup_vis_suite.ts'

declare module '@vitest/browser/context' {
	interface BrowserCommands
		extends SetupVisSuiteCommand,
			ImageSnapshotNextIndexCommand,
			HasImageSnapshotCommand,
			PreparePageImageSnapshotComparisonCommand,
			PrepareImageSnapshotComparisonCommand {}
}
