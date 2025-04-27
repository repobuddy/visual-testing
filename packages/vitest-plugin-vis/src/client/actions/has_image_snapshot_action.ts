import type { HasImageSnapshotCommand, ImageSnapshotNextIndexCommand } from '../../commands.ts'
import type { ImageSnapshotKeyOptions } from '../../shared/types.ts'
import { toTaskId } from '../task_id.ts'
import type { CurrentTest } from '../vitest_suite_proxy.ts'

export function hasImageSnapshotAction(
	commands: ImageSnapshotNextIndexCommand & HasImageSnapshotCommand,
	test: CurrentTest,
	options?: ImageSnapshotKeyOptions | undefined,
) {
	const taskId = toTaskId(test)

	return commands.hasImageSnapshot(taskId, options?.snapshotKey)
}
