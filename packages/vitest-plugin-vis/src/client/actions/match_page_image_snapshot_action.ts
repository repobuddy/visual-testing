import type { BrowserCommands } from 'vitest/browser'
import { assertSnapshotKeyWithoutDash } from '../../shared/asserts.ts'
import type {
	ImageSnapshotNextIndexCommand,
	PreparePageImageSnapshotComparisonCommand,
} from '../../shared/commands.types.ts'
import type { ToMatchPageImageSnapshotOptions } from '../../shared/types.ts'
import { compareImageSnapshot } from '../snapshot/compare_image_snapshot.ts'

export async function matchPageImageSnapshotAction(
	commands: BrowserCommands & PreparePageImageSnapshotComparisonCommand & ImageSnapshotNextIndexCommand,
	taskId: string,
	options?: ToMatchPageImageSnapshotOptions<any>,
) {
	assertSnapshotKeyWithoutDash(options?.snapshotKey)

	const info = await commands.preparePageImageSnapshotComparison(taskId, options)

	if (!info) return

	return compareImageSnapshot(commands, taskId, info, options)
}
