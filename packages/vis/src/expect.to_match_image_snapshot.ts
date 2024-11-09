import type { AsyncExpectationResult } from '@vitest/expect'
import dedent from 'dedent'
import pixelmatch, { type PixelmatchOptions } from 'pixelmatch'
import { required } from 'type-plus'
import { getCurrentTest } from 'vitest/suite'
import { imageSnapshotStubSymbol } from './@vitest/browser/constants.js'
import { commands, page, server } from './@vitest/browser/context.js'
import { assertImageSnapshot, isImageSnapshot, toSnapshotId } from './@vitest/browser/image_snapshot.logic.js'
import { toDataURL, toImageData } from './image_data.js'
import { createImageResizer } from './image_resizer.js'
import { state } from './state.js'

export interface ImageSnapshotMatcher {
	toMatchImageSnapshot(options?: MatchImageSnapshotOptions): Promise<void>
}

export type MatchImageSnapshotOptions = {
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
	failureThreshold?: number | undefined
}

export async function toMatchImageSnapshot(
	actual: any,
	options?: MatchImageSnapshotOptions | undefined,
): AsyncExpectationResult {
	const promise = toMatchImageSnapshotInternal(actual, options)
	const test = getCurrentTest()
	if (!test) return promise
	test.promises ??= []
	test.promises.push(promise)
	return promise
}

async function toMatchImageSnapshotInternal(
	actual: any,
	options?: MatchImageSnapshotOptions | undefined,
): AsyncExpectationResult {
	let subject = await actual
	if (subject?.type === imageSnapshotStubSymbol) {
		return success
	}
	if (!isImageSnapshot(subject)) {
		if (subject?.path && subject?.base64) {
			return {
				pass: false,
				actual: subject,
				message: () =>
					'`toMatchImageSnapshot()` expects the subject to be the result of `page.imageSnapshot()`, but seems like you are using `page.screenshot()`?',
			}
		}

		if (typeof subject !== 'object') {
			return {
				pass: false,
				actual: subject,
				message: () =>
					`\`toMatchImageSnapshot()\` expects the subject to be an element, locator, or result of \`page.imageSnapshot()\`, but got: \`${subject}\``,
			}
		}
		subject = await page.imageSnapshot({ element: subject })
	}

	assertImageSnapshot(subject)

	const baseline = await tryReadSnapshot(subject.baselinePath)
	if (!baseline) {
		await commands.copyFile(subject.resultPath, subject.baselinePath)
		return success
	}

	const originalImage = await toImageData(baseline)
	const [resultImage, baselineImage] = alignImagesToSameSize(subject.image, originalImage)

	// const test = getCurrentTest()
	// console.log('test', test)
	options = required(state.parameters?.snapshot, options)
	const { pass, diffAmount, diffImage } = compareImage(baselineImage, resultImage, options)

	if (!pass) {
		if (server.config.snapshotOptions.updateSnapshot === 'all') {
			await writeSnapshot(`${subject.baselinePath}`, resultImage)
			return success
		}
		await writeSnapshot(`${subject.diffPath}`, diffImage)
		return {
			pass: false,
			message: () =>
				dedent`Snapshot \`${state.taskName}\` mismatched

			${
				options?.failureThreshold
					? options?.failureThresholdType === 'percent'
						? `Expected image to match within ${options.failureThreshold}% but was differ by ${diffAmount}%.`
						: `Expected image to match within ${options.failureThreshold} pixels but was differ by ${diffAmount} pixels.`
					: `Expected image to match but was differ by ${options?.failureThresholdType === 'percent' ? `${diffAmount}%` : `${diffAmount} pixels`}.`
			}

			Expected:   '${subject.baselinePath}'
			Actual:     '${subject.resultPath}'
			Difference: '${subject.diffPath}'`,
		}
	}
	return success
}

const success = {
	pass: true,
	message: () => '',
}

function tryReadSnapshot(path: string): Promise<string | undefined> {
	return commands.readFile(path, { encoding: 'base64' }).catch(() => undefined)
}
async function writeSnapshot(path: string, image: ImageData) {
	const content = (await toDataURL(image)).split(',')[1]!
	return commands.writeFile(path, content, 'base64url')
}

function alignImagesToSameSize(image1: ImageData, image2: ImageData): [image1: ImageData, image2: ImageData] {
	if (isSameSize(image1, image2)) {
		return [image1, image2]
	}
	const size = getMaxSize(image1, image2)
	const resize = createImageResizer(size)
	return [resize(image1), resize(image2)]
}

function getMaxSize(image1: ImageData, image2: ImageData) {
	const width = Math.max(image1.width, image2.width)
	const height = Math.max(image1.height, image2.height)
	return { width, height }
}

function isSameSize(image1: ImageData, image2: ImageData) {
	return image1.width === image2.width && image1.height === image2.height
}

function compareImage(
	baselineImage: ImageData,
	resultImage: ImageData,
	{ failureThreshold = 0, failureThresholdType = 'pixel', diffOptions }: MatchImageSnapshotOptions = {},
) {
	const { width, height } = resultImage
	const diffImage = new ImageData(width, height)

	const pixelDiff = pixelmatch(resultImage.data, baselineImage.data, diffImage.data, width, height, diffOptions)
	const diffAmount = toThresholdUnit({ failureThresholdType, width, height }, pixelDiff)

	return {
		pass: diffAmount <= failureThreshold,
		diffAmount,
		diffImage,
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
