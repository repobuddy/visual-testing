import type { ToMatchImageSnapshotOptions } from 'vitest-plugin-vis/client'

/**
 * Define snapshot parameter for auto snapshot.
 */
export function defineAutoSnapshotParam(snapshot: ToMatchImageSnapshotOptions) {
	return { snapshot }
}

// This fix the inferred type cannot be named error
export type { ToMatchImageSnapshotOptions }
export function isSnapshotEnabled(tags: string[]) {
	return tags.lastIndexOf('!snapshot') < tags.lastIndexOf('snapshot')
}
