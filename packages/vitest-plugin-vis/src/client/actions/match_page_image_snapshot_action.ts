import type { BrowserCommands } from '@vitest/browser/context'
import type { ImageSnapshotNextIndexCommand } from '../../commands.ts'
import type { PrepareImageSnapshotComparisonCommand } from '../../server/commands/prepare_image_snapshot_comparison.ts'
import type { ToMatchImageSnapshotOptions } from '../../shared/types.ts'
import { compareImageSnapshot } from '../compare_image_snapshot.ts'
import { parseImageSnapshotOptions } from '../image_snapshot_options.ts'
import { toTaskId } from '../task_id.ts'
import type { CurrentTest } from '../vitest_suite_proxy.ts'

export async function matchPageImageSnapshotAction(
	commands: BrowserCommands & PrepareImageSnapshotComparisonCommand & ImageSnapshotNextIndexCommand,
	test: CurrentTest & {},
	options?: ToMatchImageSnapshotOptions<any>,
) {
	const isAutoSnapshot = !!test.meta.vis?.isAutoSnapshot
	const taskId = toTaskId(test)
	const info = await commands.preparePageImageSnapshotComparison(
		taskId,
		isAutoSnapshot,
		options?.customizeSnapshotId ? await parseImageSnapshotOptions(commands, taskId, isAutoSnapshot, options) : options,
	)

	if (!info) return

	return compareImageSnapshot(commands, taskId, info, options)
}
