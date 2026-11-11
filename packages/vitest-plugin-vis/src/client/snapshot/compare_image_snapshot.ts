import dedent from 'dedent'
import { resolve } from 'pathe'
import type { BrowserCommands } from 'vitest/browser'
import { findChangedRegions, formatChangedRegions } from '../../shared/changed_regions.ts'
import type {
	ImageSnapshotNextIndexCommand,
	PrepareImageSnapshotComparisonCommand,
} from '../../shared/commands.types.ts'
import { compareImage, getChangedMask } from '../../shared/compare_image.ts'
import { CHANGED_REGIONS_SUFFIX, REVIEW_IMAGE_SUFFIX } from '../../shared/constants.ts'
import { createReviewImage, getReviewImageSkipReason } from '../../shared/review_image.ts'
import type { ImageSnapshotComparisonInfo, ToMatchImageSnapshotOptions } from '../../shared/types.ts'
import { toDataURL, toImageData } from '../external/browser/image_data.ts'
import { server } from '../external/vitest/vitest_browser_context_proxy.ts'
import { alignImagesToSameSize } from '../image/align_images.ts'
import { formatSnapshotPath, prettifyOptions } from './compare_image_snapshot.logic.ts'

export async function compareImageSnapshot(
	commands: BrowserCommands & PrepareImageSnapshotComparisonCommand & ImageSnapshotNextIndexCommand,
	taskId: string,
	info: ImageSnapshotComparisonInfo,
	options?: ToMatchImageSnapshotOptions<any>,
) {
	options = { ...info, ...options } as any

	const resultImage = await toImageData(info.result)

	if (!info.baseline) {
		if (server.config.snapshotOptions.updateSnapshot === 'all' || options?.createMissingBaseline === true) {
			await writeSnapshot(commands, resolve(info.projectRoot, info.baselinePath), resultImage)
			return
		}
		throw new Error(
			dedent`Snapshot \`${taskId}\` has no baseline image. Please review the new snapshot and update the baseline image.

				Options:    ${prettifyOptions(options)}
				Actual:     ${formatSnapshotPath(info.projectRoot, info.resultPath)}`,
		)
	}

	const baselineImage = await toImageData(info.baseline)
	const [baselineAlignedImage, resultAlignedImage] = alignImagesToSameSize(baselineImage, resultImage)
	const { width, height } = baselineAlignedImage
	const diffImage = new ImageData(width, height)
	const { pass, diffAmount } = compareImage(
		baselineAlignedImage.data,
		resultAlignedImage.data,
		diffImage.data,
		width,
		height,
		options as ToMatchImageSnapshotOptions<any>,
	)
	if (pass) {
		if (options?.expectToFail) {
			throw new Error(
				dedent`Snapshot \`${taskId}\` matched but expected to fail.

							Options:    ${prettifyOptions(options)}
							Diff:       ${options.failureThresholdType === 'percent' ? `${diffAmount}%` : `${diffAmount} pixels`}

							Expected:   ${formatSnapshotPath(info.projectRoot, info.baselinePath)}
							Actual:     ${formatSnapshotPath(info.projectRoot, info.resultPath)}`,
			)
		}
		return
	}
	if (server.config.snapshotOptions.updateSnapshot === 'all' && !options?.expectToFail) {
		await writeSnapshot(commands, resolve(info.projectRoot, info.baselinePath), resultImage)
		return
	}

	await writeSnapshot(commands, resolve(info.projectRoot, info.diffPath), diffImage)

	const mask = getChangedMask(
		baselineAlignedImage.data,
		resultAlignedImage.data,
		diffImage.data,
		width,
		height,
		options as ToMatchImageSnapshotOptions<any>,
	)
	const regions = findChangedRegions(mask, width, height)
	await commands.writeFile(
		resolve(info.projectRoot, toSiblingPath(info.diffPath, CHANGED_REGIONS_SUFFIX)),
		JSON.stringify({ width, height, regions }),
	)
	let review = ''
	if (options?.reviewImage !== false) {
		const skipReason = getReviewImageSkipReason({ baseline: baselineImage, result: resultImage, regions })
		if (skipReason) {
			review = `\nReview:     skipped, ${skipReason}; open Actual or Difference instead`
		} else {
			const reviewPath = toSiblingPath(info.diffPath, REVIEW_IMAGE_SUFFIX)
			const reviewImage = createReviewImage(baselineAlignedImage, resultAlignedImage, mask, regions)
			await writeSnapshot(
				commands,
				resolve(info.projectRoot, reviewPath),
				new ImageData(reviewImage.data, reviewImage.width, reviewImage.height),
			)
			review = `\nReview:     ${formatSnapshotPath(info.projectRoot, reviewPath)} (baseline, result, diff of each region)`
		}
	}

	throw new Error(
		dedent`Snapshot \`${taskId}\` mismatched

					${
						options?.failureThreshold
							? options?.failureThresholdType === 'percent'
								? `Expected image to match within ${options.failureThreshold}% but was differ by ${diffAmount}%.`
								: `Expected image to match within ${options.failureThreshold} pixels but was differ by ${diffAmount} pixels.`
							: `Expected image to match but was differ by ${options?.failureThresholdType === 'percent' ? `${diffAmount}%` : `${diffAmount} pixels`}.`
					}${
						baselineImage.width !== resultImage.width || baselineImage.height !== resultImage.height
							? `\nThe image size changed from ${baselineImage.width}x${baselineImage.height} to ${resultImage.width}x${resultImage.height}.`
							: ''
					}

					Options:    ${prettifyOptions(options)}

					Expected:   ${formatSnapshotPath(info.projectRoot, info.baselinePath)}
					Actual:     ${formatSnapshotPath(info.projectRoot, info.resultPath)}
					Difference: ${formatSnapshotPath(info.projectRoot, info.diffPath)}
					Changed:    ${formatChangedRegions(regions)}${review}`,
	)
}

function toSiblingPath(diffPath: string, suffix: string) {
	return diffPath.replace(/\.png$/, suffix)
}

async function writeSnapshot(commands: BrowserCommands, path: string, image: ImageData) {
	const content = (await toDataURL(image)).split(',')[1]!
	return commands.writeFile(path, content, { encoding: 'base64' })
}
