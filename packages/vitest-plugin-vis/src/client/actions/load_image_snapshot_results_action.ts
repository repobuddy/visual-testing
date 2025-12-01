import type { LoadImageSnapshotResultsCommand } from '../../shared/commands.types.ts'

export function loadImageSnapshotResultsAction(commands: LoadImageSnapshotResultsCommand, taskId: string) {
	return commands.loadImageSnapshotResults(taskId)
}
