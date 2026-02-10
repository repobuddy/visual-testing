import type {
	HasImageSnapshotCommand,
	ImageSnapshotNextIndexCommand,
	LoadImageSnapshotResultsCommand,
	PrepareImageSnapshotComparisonCommand,
	PreparePageImageSnapshotComparisonCommand,
	SetViewportSizeCommand,
	SetupVisSuiteCommand,
} from '../../shared/commands.types.ts'

declare module 'vitest/browser' {
	interface BrowserCommands
		extends SetupVisSuiteCommand,
			ImageSnapshotNextIndexCommand,
			HasImageSnapshotCommand,
			PreparePageImageSnapshotComparisonCommand,
			PreparePageImageSnapshotComparisonCommand,
			LoadImageSnapshotResultsCommand,
			SetViewportSizeCommand {}
}
