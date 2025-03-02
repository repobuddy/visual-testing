import type { ComparisonMethod, ToMatchImageSnapshotOptions } from '../../shared/types.ts'

export interface ImageSnapshotMatcher {
	toMatchImageSnapshot<M extends ComparisonMethod>(options?: ToMatchImageSnapshotOptions<M> | undefined): Promise<void>
}
