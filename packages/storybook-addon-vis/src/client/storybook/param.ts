import type {
	ComparisonMethod,
	FailureThresholdOptions,
	ImageSnapshotCompareOptions,
	ImageSnapshotKeyOptions,
	ImageSnapshotSubjectOptions,
	ImageSnapshotTimeoutOptions,
	PageImageSnapshotOptions,
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
	PageImageSnapshotOptions,
	PixelComparisonOptions,
	SsimComparisonOptions,
	ToMatchImageSnapshotOptions,
}

/**
 * Define snapshot parameter for auto snapshot.
 *
 * Set `fullPage: true` to snapshot the whole page instead of the subject.
 */
export function defineAutoSnapshotParam<M extends ComparisonMethod>(
	snapshot: ToMatchImageSnapshotOptions<M> & ImageSnapshotSubjectOptions & PageImageSnapshotOptions,
) {
	return { snapshot }
}
