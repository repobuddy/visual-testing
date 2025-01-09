import pixelmatch from 'pixelmatch'
import { type Options, ssim } from 'ssim.js'
import { convertThresholdUnit } from './convert_threshold_unit.ts'
import type { ComparisonMethod, ImageSnapshotCompareOptions } from './types.ts'

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
