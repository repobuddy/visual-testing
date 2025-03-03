import type pixelMatch from 'pixelmatch'
import type { Options as SsimOptions } from 'ssim.js'
import type { getCurrentTest } from 'vitest/suite'
import type { NAME } from './constants.ts'

export interface ImageSnapshotTimeoutOptions {
	/**
	 * Timeout for taking the snapshot.
	 *
	 * Default: 30000 ms (30 seconds)
	 */
	timeout?: number | undefined
}

export interface ImageSnapshotIdOptions {
	/**
	 * Customize the snapshot id. This is used as the filename of the snapshot: `${snapshotId}.png`
	 *
	 * @param id The id of the snapshot.
	 * @param index The index of the snapshot.
	 */
	customizeSnapshotId?: (context: {
		id: string
		index: number
		isAutoSnapshot: boolean
	}) => string
}

export type ComparisonMethod = 'pixel' | 'ssim'

export type FailureThresholdOptions = {
	/**
	 * Failure threshold should measure in `pixel` or `percent`.
	 *
	 * Default is `pixel`.
	 */
	failureThresholdType?: 'pixel' | 'percent' | undefined
	/**
	 * Failure tolerance threshold.
	 *
	 * Default is `0`.
	 */
	failureThreshold?: number | undefined
}

export type SsimComparisonOptions<M = 'ssim'> = {
	comparisonMethod: M
	/**
	 * Custom options passed to 'ssim'
	 */
	diffOptions?: Partial<SsimOptions> | undefined
}
export type PixelComparisonOptions<M = 'pixel'> = {
	comparisonMethod?: M | undefined
	/**
	 * Custom options passed to 'pixelmatch'
	 */
	diffOptions?: Parameters<typeof pixelMatch>[5] | undefined
}

export type ImageSnapshotCompareOptions<M extends ComparisonMethod = 'pixel'> = (M extends 'ssim'
	? SsimComparisonOptions<M>
	: PixelComparisonOptions<M>) &
	FailureThresholdOptions

export type AutoSnapshotOptions = {
	/**
	 * Specify the data-testid of the subject element. Default is `subject`.
	 *
	 * If the test does not have an element with the specified data-testid,
	 * the `body` element will be used.
	 */
	subjectDataTestId?: string | undefined
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

export type SnapshotMeta<M extends ComparisonMethod> = ToMatchImageSnapshotOptions<M> &
	AutoSnapshotOptions & {
		enable?: boolean | undefined
		[key: string]: unknown
	}
