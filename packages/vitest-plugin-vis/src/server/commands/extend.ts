import { type ImageSnapshotCommand, imageSnapshot } from './image_snapshot.ts'
import { type MatchImageSnapshotCommand, matchImageSnapshot } from './match_image_snapshot.ts'
import { type SetupVisSuiteCommand, setupVisSuite } from './setup_vis_suite.ts'

declare module '@vitest/browser/context' {
	interface BrowserCommands extends SetupVisSuiteCommand, ImageSnapshotCommand, MatchImageSnapshotCommand {}
}

export const commands = {
	setupVisSuite,
	imageSnapshot,
	matchImageSnapshot,
}
