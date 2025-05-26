import type { BrowserCommands } from '@vitest/browser/context'
import type { ImageSnapshotNextIndexCommand } from '../../commands.ts'
import type { PrepareImageSnapshotComparisonCommand } from '../../server/commands/prepare_image_snapshot_comparison.ts'
import { assertSnapshotKeyWithoutDash } from '../../shared/asserts.ts'
import type { ToMatchImageSnapshotOptions } from '../../shared/types.ts'
import { compareImageSnapshot } from '../compare_image_snapshot.ts'

export async function matchPageImageSnapshotAction(
	commands: BrowserCommands & PrepareImageSnapshotComparisonCommand & ImageSnapshotNextIndexCommand,
	taskId: string,
	options?: ToMatchImageSnapshotOptions<any>,
) {
	assertSnapshotKeyWithoutDash(options?.snapshotKey)

	const info = await commands.preparePageImageSnapshotComparison(taskId, options)

	if (!info) return

	return compareImageSnapshot(commands, taskId, info, options)
}
