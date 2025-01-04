import pixelmatch from 'pixelmatch'
import { convertThresholdUnit } from '../shared/convert_threshold_unit.ts'
import type { ImageSnapshotCompareOptions } from '../shared/types.ts'

export function compareImage(
	baselineImage: ImageData,
	resultImage: ImageData,
	{ failureThreshold = 0, failureThresholdType = 'pixel', diffOptions }: ImageSnapshotCompareOptions = {},
) {
	const { width, height } = resultImage
	const diffImage = new ImageData(width, height)

	const pixelDiff = pixelmatch(resultImage.data, baselineImage.data, diffImage.data, width, height, diffOptions)
	const diffAmount = convertThresholdUnit({ failureThresholdType, width, height }, pixelDiff)

	return {
		pass: diffAmount <= failureThreshold,
		diffAmount,
		diffImage,
	}
}
