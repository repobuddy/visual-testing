import type { ComparisonMethod, ToMatchImageSnapshotOptions } from 'vitest-plugin-vis/client'

/**
 * Define snapshot parameter for auto snapshot.
 */
export function defineAutoSnapshotParam<M extends ComparisonMethod>(snapshot: ToMatchImageSnapshotOptions<M>) {
	return { snapshot }
}

// This fix the inferred type cannot be named error
export type { ToMatchImageSnapshotOptions }
export function isSnapshotEnabled(tags: string[]) {
	return tags.lastIndexOf('!snapshot') < tags.lastIndexOf('snapshot')
}
