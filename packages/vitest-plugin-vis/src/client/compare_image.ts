import pixelmatch from 'pixelmatch'
import { convertThresholdUnit } from '../shared/convert_threshold_unit.ts'
import type { ImageSnapshotCompareOptions } from '../shared/types.ts'

export function compareImage(
	img1: Uint8ClampedArray,
	img2: Uint8ClampedArray,
	output: Uint8ClampedArray,
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
