import type { PixelmatchOptions } from 'pixelmatch'
import type { Options as SsimOptions } from 'ssim.js'

export interface ImageSnapshotTimeoutOptions {
	/**
	 * Timeout for taking the snapshot.
	 *
	 * Default: 5000 ms locally, 30000 ms on CI.
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
	customizeSnapshotId?: (id: string, index: number) => string
}

export type ImageSnapshotCompareOptions<M extends 'pixel' | 'ssim' = 'pixel'> = M extends 'ssim'
	? {
			comparisonMethod: M
			/**
			 * Custom options passed to 'ssim'
			 */
			diffOptions?: Partial<SsimOptions> | undefined
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
	: {
			comparisonMethod?: M | undefined
			/**
			 * Custom options passed to 'pixelmatch'
			 */
			diffOptions?: PixelmatchOptions | undefined
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
