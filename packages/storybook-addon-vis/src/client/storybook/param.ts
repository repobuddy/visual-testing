import type {
	ComparisonMethod,
	FailureThresholdOptions,
	ImageSnapshotCompareOptions,
	ImageSnapshotKeyOptions,
	ImageSnapshotSubjectOptions,
	ImageSnapshotTimeoutOptions,
	PixelComparisonOptions,
	SsimComparisonOptions,
	ToMatchImageSnapshotOptions,
} from 'vitest-plugin-vis/client-api'

// This fix the inferred type cannot be named error
export type {
	ComparisonMethod,
	FailureThresholdOptions,
	ImageSnapshotCompareOptions,
	ImageSnapshotKeyOptions,
	ImageSnapshotSubjectOptions,
	ImageSnapshotTimeoutOptions,
	PixelComparisonOptions,
	SsimComparisonOptions,
	ToMatchImageSnapshotOptions,
}

/**
 * Define snapshot parameter for auto snapshot.
 */
export function defineAutoSnapshotParam<M extends ComparisonMethod>(
	snapshot: ToMatchImageSnapshotOptions<M> & ImageSnapshotSubjectOptions,
) {
	return { snapshot }
}
