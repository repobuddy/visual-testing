import type pixelMatch from 'pixelmatch'
import type { Options as SsimDiffOptions } from 'ssim.js'
import type { SnapshotMeta } from '../client/task/snapshot_meta.ts'
import type { NAME } from './constants.ts'

export type Awaitable<T> = T | PromiseLike<T>

export interface ImageSnapshotTimeoutOptions {
	/**
	 * Timeout for taking the snapshot.
	 *
	 * Default: 30000 ms (30 seconds)
	 */
	timeout?: number | undefined
}

export interface ImageSnapshotKeyOptions {
	/**
	 * Customize the `snapshotKey` of the snapshot.
	 */
	snapshotKey?: string | undefined
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
	 * If `failureThresholdType` is `pixel`, the value is the number of pixels that are allowed to be different.
	 * If `failureThresholdType` is `percent`, the value is the percentage of pixels that are allowed to be different.
	 *
	 * Default is `0`.
	 *
	 * @example
	 * ```ts
	 * // Allow 10 pixels to be different
	 * failureThresholdType: 'pixel'
	 * failureThreshold: 10
	 *
	 * // Allow 10% of pixels to be different
	 * failureThresholdType: 'percent'
	 * failureThreshold: 10
	 * ```
	 */
	failureThreshold?: number | undefined
}

export type SsimComparisonOptions<M = 'ssim'> = {
	comparisonMethod: M
	/**
	 * Custom options passed to 'ssim'
	 */
	diffOptions?: Partial<SsimDiffOptions> | undefined
}

export type { SsimDiffOptions }

export type PixelComparisonOptions<M = 'pixel'> = {
	comparisonMethod?: M | undefined
	/**
	 * Custom options passed to 'pixelmatch'
	 */
	diffOptions?: PixelDiffOptions | undefined
}

export type PixelDiffOptions = Parameters<typeof pixelMatch>[5]

export type ImageSnapshotCompareOptions<M extends ComparisonMethod = 'pixel'> = (M extends 'ssim'
	? SsimComparisonOptions<M>
	: PixelComparisonOptions<M>) &
	FailureThresholdOptions

export type ImageSnapshotSubjectOptions = {
	/**
	 * Specify the query of the subject element.
	 *
	 * If the test does not have an element with the specified query,
	 * the `body` element will be used.
	 */
	subject?: string | undefined
}
export type ToMatchImageSnapshotOptions<M extends ComparisonMethod = 'pixel'> = ImageSnapshotTimeoutOptions &
	ImageSnapshotKeyOptions &
	ImageSnapshotCompareOptions<M> & {
		/**
		 * Expect the matcher to fail.
		 * If it passes, it will throw an error with details.
		 */
		expectToFail?: boolean | undefined
	}

export interface PageImageSnapshotOptions {
	fullPage?: boolean | undefined
}

export type ToMatchPageImageSnapshotOptions<M extends ComparisonMethod = 'pixel'> = ToMatchImageSnapshotOptions<M> &
	PageImageSnapshotOptions

export type SnapshotTestMeta = {
	meta: {
		[NAME]?: SnapshotMeta<ComparisonMethod>
	}
}

export type SetupVisOptions<GM extends Record<string, any> | unknown = unknown> = {
	auto?:
		| boolean
		| (<C extends ComparisonMethod, M extends Record<string, any> | unknown = unknown>(
				options: SnapshotMeta<C> & M & GM,
		  ) => Promise<boolean> | Promise<void> | boolean | void)
		| Record<
				string,
				| boolean
				| (<C extends ComparisonMethod, M extends Record<string, any> | unknown = unknown>(
						options: SnapshotMeta<C> & M & GM,
				  ) => Promise<boolean> | Promise<void> | boolean | void)
		  >
}
