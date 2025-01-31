import type {
	AutoSnapshotOptions,
	ComparisonMethod,
	ImageSnapshotCompareOptions,
	ImageSnapshotIdOptions,
	ImageSnapshotTimeoutOptions,
	ToMatchImageSnapshotOptions,
} from 'vitest-plugin-vis/client'

// This fix the inferred type cannot be named error
export type {
	AutoSnapshotOptions,
	ToMatchImageSnapshotOptions,
	ImageSnapshotCompareOptions,
	ImageSnapshotIdOptions,
	ImageSnapshotTimeoutOptions,
}

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
