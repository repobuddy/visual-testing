import type { LoadImageSnapshotResultsCommand } from '../../server/commands/load_image_snapshot_results.ts'

export function loadImageSnapshotResultsAction(commands: LoadImageSnapshotResultsCommand, taskId: string) {
	return commands.loadImageSnapshotResults(taskId)
}
