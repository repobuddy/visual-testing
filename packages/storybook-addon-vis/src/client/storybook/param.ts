import type {
	AutoSnapshotOptions,
	ComparisonMethod,
	FailureThresholdOptions,
	ImageSnapshotCompareOptions,
	ImageSnapshotIdOptions,
	ImageSnapshotTimeoutOptions,
	PixelComparisonOptions,
	SsimComparisonOptions,
	ToMatchImageSnapshotOptions,
} from 'vitest-plugin-vis/client-api'

// This fix the inferred type cannot be named error
export type {
	AutoSnapshotOptions,
	ComparisonMethod,
	FailureThresholdOptions,
	ImageSnapshotCompareOptions,
	ImageSnapshotIdOptions,
	ImageSnapshotTimeoutOptions,
	PixelComparisonOptions,
	SsimComparisonOptions,
	ToMatchImageSnapshotOptions,
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
