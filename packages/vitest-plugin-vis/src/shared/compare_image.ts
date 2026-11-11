import pixelmatch from 'pixelmatch'
import { type Options, ssim } from 'ssim.js'
import { convertThresholdUnit } from './convert_threshold_unit.ts'
import type { ComparisonMethod, ImageSnapshotCompareOptions, PixelDiffOptions } from './types.ts'

export function compareImage<M extends ComparisonMethod>(
	img1: Uint8ClampedArray | Buffer,
	img2: Uint8ClampedArray | Buffer,
	output: Uint8ClampedArray | Buffer,
	width: number,
	height: number,
	options: ImageSnapshotCompareOptions<M> = {} as any,
) {
	const pixelDiff =
		options.comparisonMethod === 'ssim'
			? compareWithSsim(img1, img2, output, width, height, options.diffOptions)
			: pixelmatch(img1, img2, output, width, height, options.diffOptions)
	const diffAmount = convertThresholdUnit(
		{ failureThresholdType: options.failureThresholdType ?? 'pixel', width, height },
		pixelDiff,
	)

	return {
		pass: diffAmount <= (options.failureThreshold ?? 0),
		diffAmount,
	}
}

/**
 * A pixel counts as changed in the SSIM comparison when its SSIM value is below this.
 */
export const SSIM_CHANGED_THRESHOLD = 0.95

/**
 * Returns one byte per pixel, non-zero where the pixel changed.
 *
 * The pixel method runs pixelmatch again in mask mode, so anti-aliased pixels are not included.
 * The SSIM method reads the diff written by {@link compareImage} and applies {@link SSIM_CHANGED_THRESHOLD}.
 */
export function getChangedMask<M extends ComparisonMethod>(
	img1: Uint8ClampedArray | Buffer,
	img2: Uint8ClampedArray | Buffer,
	diff: Uint8ClampedArray | Buffer,
	width: number,
	height: number,
	options: ImageSnapshotCompareOptions<M> = {} as any,
) {
	const mask = new Uint8Array(width * height)
	if (options.comparisonMethod === 'ssim') {
		// `compareWithSsim()` writes `1 - ssim` to the alpha channel
		const minAlpha = 0xff * (1 - SSIM_CHANGED_THRESHOLD)
		for (let i = 0; i < mask.length; i++) if (diff[i * 4 + 3]! > minAlpha) mask[i] = 1
		return mask
	}
	const output = new Uint8ClampedArray(width * height * 4)
	pixelmatch(img1, img2, output, width, height, { ...(options.diffOptions as PixelDiffOptions), diffMask: true })
	for (let i = 0; i < mask.length; i++) if (output[i * 4 + 3]) mask[i] = 1
	return mask
}

/**
 * @author This code is based on `jest-image-snapshot` implementation.
 */
function compareWithSsim(
	img1: Uint8ClampedArray | Buffer,
	img2: Uint8ClampedArray | Buffer,
	output: Uint8ClampedArray | Buffer,
	width: number,
	height: number,
	diffOptions?: Partial<Options>,
) {
	const newImage = { data: img1, width: width, height: height }
	const baselineImage = { data: img2, width: width, height: height }
	const { ssim_map, mssim } = ssim(newImage as any, baselineImage as any, {
		ssim: 'bezkrovny',
		...diffOptions,
	})
	// Converts the SSIM value to different pixels based on image width and height
	// conforms to how pixelmatch works.
	const diffPixels = Math.round((1 - mssim) * width * height)
	const diffRgbaPixels = new DataView(output.buffer, output.byteOffset)
	for (let ln = 0; ln !== height; ++ln) {
		for (let pos = 0; pos !== width; ++pos) {
			const rPos = ln * width + pos
			// initial value is transparent.  We'll add in the SSIM offset.
			// red (ff) green (00) blue (00) alpha (00)
			const diffValue =
				0xff000000 +
				Math.floor(
					0xff *
						(1 -
							ssim_map.data[
								ssim_map.width * Math.round((ssim_map.height * ln) / height) +
									Math.round((ssim_map.width * pos) / width)
							]!),
				)
			diffRgbaPixels.setUint32(rPos * 4, diffValue)
		}
	}
	return diffPixels
}
