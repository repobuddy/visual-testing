import type {
	ImageSnapshotCompareOptions,
	ImageSnapshotKeyOptions,
	ImageSnapshotTimeoutOptions,
} from '../../shared/types.ts'

export type MatchImageSnapshotOptions = ImageSnapshotTimeoutOptions &
	ImageSnapshotCompareOptions<any> &
	ImageSnapshotKeyOptions
