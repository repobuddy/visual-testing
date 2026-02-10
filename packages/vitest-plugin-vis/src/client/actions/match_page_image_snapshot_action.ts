import type { BrowserCommands } from 'vitest/browser'
import { assertSnapshotKeyWithoutDash } from '../../shared/asserts.ts'
import type {
	ImageSnapshotNextIndexCommand,
	PreparePageImageSnapshotComparisonCommand,
} from '../../shared/commands.types.ts'
import type { ToMatchPageImageSnapshotOptions } from '../../shared/types.ts'
import { prepareFrameForFullPageScreenshot } from '../page/prepare_frame_for_full_page_screenshot.ts'
import { compareImageSnapshot } from '../snapshot/compare_image_snapshot.ts'

export type MatchPageImageSnapshotActionCommands = BrowserCommands &
	PreparePageImageSnapshotComparisonCommand &
	ImageSnapshotNextIndexCommand

export async function matchPageImageSnapshotAction(
	commands: MatchPageImageSnapshotActionCommands,
	taskId: string,
	options?: ToMatchPageImageSnapshotOptions<any>,
) {
	assertSnapshotKeyWithoutDash(options?.snapshotKey)

	if (options?.fullPage) {
		await prepareFrameForFullPageScreenshot()
	}
	const info = await commands.preparePageImageSnapshotComparison(taskId, options)

	if (!info) return

	return compareImageSnapshot(commands, taskId, info, options)
}
