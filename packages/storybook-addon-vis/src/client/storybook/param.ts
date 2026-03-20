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
	ToMatchPageImageSnapshotOptions,
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
	ToMatchPageImageSnapshotOptions,
}

/**
 * Define snapshot parameter for auto snapshot.
 * Use `fullPage: true` to capture a full-page screenshot instead of the subject element.
 */
export function defineAutoSnapshotParam<M extends ComparisonMethod>(
	snapshot: ToMatchPageImageSnapshotOptions<M> & ImageSnapshotSubjectOptions,
) {
	return { snapshot }
}
