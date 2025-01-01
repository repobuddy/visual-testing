import type { ToMatchImageSnapshotOptions } from 'vitest-plugin-vis/client'

/**
 * Define snapshot parameter for auto snapshot.
 */
export function defineSnapshotParam(snapshot: ToMatchImageSnapshotOptions) {
	return { snapshot }
}
