import type { LoadImageSnapshotResultsCommand } from '../../server/commands/load_image_snapshot_results.ts'
import { toTaskId } from '../task_id.ts'
import type { CurrentTest } from '../vitest_suite_proxy.ts'

export function loadImageSnapshotResultsAction(commands: LoadImageSnapshotResultsCommand, test: CurrentTest) {
	const taskId = toTaskId(test)

	return commands.loadImageSnapshotResults(taskId)
}
