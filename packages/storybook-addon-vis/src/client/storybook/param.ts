import type { ToMatchImageSnapshotOptions } from 'vitest-plugin-vis/client'

/**
 * Define snapshot parameter for auto snapshot.
 */
export function defineAutoSnapshotParam(snapshot: ToMatchImageSnapshotOptions) {
	return { snapshot }
}
