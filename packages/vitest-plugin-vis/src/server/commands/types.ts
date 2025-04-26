import type {
	ImageSnapshotCompareOptions,
	ImageSnapshotIdOptions,
	ImageSnapshotTimeoutOptions,
} from '../../shared/types.ts'

export type MatchImageSnapshotOptions = ImageSnapshotTimeoutOptions &
	ImageSnapshotIdOptions &
	ImageSnapshotCompareOptions<any> & {
		/**
		 * The snapshot file id calculated on the client side.
		 */
		snapshotFileId?: string | undefined
	}
