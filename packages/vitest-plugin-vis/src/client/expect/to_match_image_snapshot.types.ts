import type {
	ImageSnapshotCompareOptions,
	ImageSnapshotIdOptions,
	ImageSnapshotTimeoutOptions,
} from '../../shared/types.ts'

export interface ImageSnapshotMatcher {
	toMatchImageSnapshot(options?: ToMatchImageSnapshotOptions | undefined): Promise<void>
}

export interface ToMatchImageSnapshotOptions
	extends ImageSnapshotTimeoutOptions,
		ImageSnapshotIdOptions,
		ImageSnapshotCompareOptions {
	/**
	 * Expect the matcher to fail.
	 * If it passes, it will throw an error with details.
	 */
	expectToFail?: boolean | undefined
}
