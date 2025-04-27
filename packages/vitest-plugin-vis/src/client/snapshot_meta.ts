import type { ComparisonMethod, ImageSnapshotSubjectOptions, ToMatchImageSnapshotOptions } from '../shared/types.ts'

export type SnapshotMeta<M extends ComparisonMethod> = ToMatchImageSnapshotOptions<M> &
	ImageSnapshotSubjectOptions & {
		enable?: boolean | undefined
		[key: string]: unknown
	}
