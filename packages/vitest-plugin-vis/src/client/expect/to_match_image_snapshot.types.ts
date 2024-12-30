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
		ImageSnapshotCompareOptions {}
