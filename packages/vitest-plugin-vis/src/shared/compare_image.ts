import pixelmatch from 'pixelmatch'
import { convertThresholdUnit } from './convert_threshold_unit.ts'
import type { ImageSnapshotCompareOptions } from './types.ts'

export function compareImage(
	img1: Uint8ClampedArray | Buffer,
	img2: Uint8ClampedArray | Buffer,
	output: Uint8ClampedArray | Buffer,
	width: number,
	height: number,
	{ failureThreshold = 0, failureThresholdType = 'pixel', diffOptions }: ImageSnapshotCompareOptions = {},
) {
	const pixelDiff = pixelmatch(img1, img2, output, width, height, diffOptions)
	const diffAmount = convertThresholdUnit({ failureThresholdType, width, height }, pixelDiff)

	return {
		pass: diffAmount <= failureThreshold,
		diffAmount,
	}
}
