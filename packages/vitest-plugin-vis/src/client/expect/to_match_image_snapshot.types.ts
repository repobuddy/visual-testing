import type {
	ComparisonMethod,
	ImageSnapshotCompareOptions,
	ImageSnapshotIdOptions,
	ImageSnapshotTimeoutOptions,
} from '../../shared/types.ts'

export interface ImageSnapshotMatcher {
	toMatchImageSnapshot<M extends ComparisonMethod>(options?: ToMatchImageSnapshotOptions<M> | undefined): Promise<void>
}

export type ToMatchImageSnapshotOptions<M extends ComparisonMethod = 'pixel'> = ImageSnapshotTimeoutOptions &
	ImageSnapshotIdOptions &
	ImageSnapshotCompareOptions<M> & {
		/**
		 * Expect the matcher to fail.
		 * If it passes, it will throw an error with details.
		 */
		expectToFail?: boolean | undefined
	}
