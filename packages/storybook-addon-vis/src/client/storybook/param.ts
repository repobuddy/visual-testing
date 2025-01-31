import type { ComparisonMethod, ToMatchImageSnapshotOptions } from 'vitest-plugin-vis/client'
import type { AutoSnapshotOptions } from 'vitest-plugin-vis/config'

// This fix the inferred type cannot be named error
export type { AutoSnapshotOptions, ToMatchImageSnapshotOptions }

/**
 * Define snapshot parameter for auto snapshot.
 */
export function defineAutoSnapshotParam<M extends ComparisonMethod>(
	snapshot: ToMatchImageSnapshotOptions<M> & AutoSnapshotOptions,
) {
	return { snapshot }
}

export function isSnapshotEnabled(tags: string[]) {
	return tags.lastIndexOf('!snapshot') < tags.lastIndexOf('snapshot')
}
