import pixelmatch from 'pixelmatch'
import type { MatchImageSnapshotOptions } from './types.ts'

export function compareImage(
	width: number,
	height: number,
	baselineData: Uint8ClampedArray,
	resultData: Uint8ClampedArray,
	{ failureThreshold = 0, failureThresholdType = 'pixel', diffOptions }: MatchImageSnapshotOptions = {},
) {
	const diffData = new Uint8ClampedArray(width * height * 4)

	const pixelDiff = pixelmatch(resultData, baselineData, diffData, width, height, diffOptions)
	const diffAmount = toThresholdUnit({ failureThresholdType, width, height }, pixelDiff)

	return {
		pass: diffAmount <= failureThreshold,
		diffAmount,
		diffData,
	}
}

function toThresholdUnit(
	{ failureThresholdType, width, height }: { failureThresholdType: 'pixel' | 'percent'; width: number; height: number },
	pixelDiff: number,
): number {
	switch (failureThresholdType) {
		case 'pixel':
			return pixelDiff
		case 'percent':
			return (pixelDiff / (width * height)) * 100
		default:
			throw new Error(`Invalid failureThresholdType: ${failureThresholdType}`)
	}
}
