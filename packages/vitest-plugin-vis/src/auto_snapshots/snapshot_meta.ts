import type {
	ComparisonMethod,
	ImageSnapshotSubjectOptions,
	PageImageSnapshotOptions,
	ToMatchImageSnapshotOptions,
} from '../shared/types.ts'

export type SnapshotMeta<M extends ComparisonMethod> = ToMatchImageSnapshotOptions<M> &
	ImageSnapshotSubjectOptions &
	PageImageSnapshotOptions & {
		/**
		 * Whether to enable the snapshot.
		 *
		 * Default: `true`
		 */
		enable?: boolean | undefined
		[key: string]: unknown
	}
