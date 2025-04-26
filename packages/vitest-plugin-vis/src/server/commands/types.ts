import type { ImageSnapshotCompareOptions, ImageSnapshotTimeoutOptions } from '../../shared/types.ts'

export type MatchImageSnapshotOptions = ImageSnapshotTimeoutOptions &
	ImageSnapshotCompareOptions<any> & {
		/**
		 * The snapshot file id calculated on the client side.
		 */
		snapshotFileId?: string | undefined
	}
