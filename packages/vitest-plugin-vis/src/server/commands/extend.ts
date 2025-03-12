import { type HasImageSnapshotCommand, hasImageSnapshot } from './has_image_snapshot.ts'
import { type ImageSnapshotNextIndexCommand, imageSnapshotNextIndex } from './image_snapshot_next_index.ts'
import { type MatchImageSnapshotCommand, matchImageSnapshot } from './match_image_snapshot.ts'
import {
	type PrepareImageSnapshotComparisonCommand,
	prepareImageSnapshotComparison,
} from './prepare_image_snapshot_comparison.ts'
import {
	type PreparePageImageSnapshotComparisonCommand,
	preparePageImageSnapshotComparison,
} from './prepare_page_image_snapshot_comparison.ts'
import { type SetupVisSuiteCommand, setupVisSuite } from './setup_vis_suite.ts'

declare module '@vitest/browser/context' {
	interface BrowserCommands
		extends SetupVisSuiteCommand,
			ImageSnapshotNextIndexCommand,
			HasImageSnapshotCommand,
			PreparePageImageSnapshotComparisonCommand,
			PrepareImageSnapshotComparisonCommand,
			MatchImageSnapshotCommand {}
}

export const commands = {
	setupVisSuite,
	imageSnapshotNextIndex,
	hasImageSnapshot,
	matchImageSnapshot,
	preparePageImageSnapshotComparison,
	prepareImageSnapshotComparison,
}
