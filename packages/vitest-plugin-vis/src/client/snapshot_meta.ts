import type { ComparisonMethod, ImageSnapshotSubjectOptions, ToMatchImageSnapshotOptions } from '../shared/types.ts'

export type SnapshotMeta<M extends ComparisonMethod> = ToMatchImageSnapshotOptions<M> &
	ImageSnapshotSubjectOptions & {
		/**
		 * Whether to enable the snapshot.
		 *
		 * Default: `true`
		 */
		enable?: boolean | undefined
		[key: string]: unknown
	}
