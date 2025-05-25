import type { StorybookVisOptions } from './vis_options.ts'

export function createStorybookVisServer(options: StorybookVisOptions) {
	return {
		options,
		async getImageSnapshotResults(taskId: string, taskPath: string) {
			// TODO: Implement actual image snapshot comparison logic
			return {
				key: `${taskId}-${taskPath}`,
				baseline: undefined,
				diff: undefined,
				result: undefined,
			}
		},
	}
}
