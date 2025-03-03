import dedent from 'dedent'
import { resolve } from 'pathe'
import { PNG } from 'pngjs'
import type { BrowserCommand } from 'vitest/node'
import { isBase64String } from '../../shared/base64.ts'
import { compareImage } from '../../shared/compare_image.ts'
import { getMaxSize } from '../../shared/get_max_size.ts'
import { isSameSize } from '../../shared/is_same_size.ts'
import type {
	ImageSnapshotCompareOptions,
	ImageSnapshotIdOptions,
	ImageSnapshotTimeoutOptions,
} from '../../shared/types.ts'
import { file } from '../file.ts'
import { takeSnapshot, takeSnapshotByBrowser, writeSnapshot, writeSnapshotBuffer } from '../snapshot.ts'
import { visContext } from '../vis_context.ts'
import { assertTestPathDefined } from './_assertions.ts'

export interface MatchImageSnapshotCommand {
	matchImageSnapshot: (
		taskId: string | undefined,
		subject: string,
		isAutoSnapshot: boolean,
		options?: MatchImageSnapshotOptions | undefined,
	) => Promise<void>
}

export type MatchImageSnapshotOptions = ImageSnapshotTimeoutOptions &
	ImageSnapshotIdOptions &
	ImageSnapshotCompareOptions<any> & {
		/**
		 * The snapshot file id calculated on the client side.
		 */
		snapshotFileId?: string | undefined
	}

export const matchImageSnapshot: BrowserCommand<
	[taskId: string, subject: string, isAutoSnapshot: boolean, options?: MatchImageSnapshotOptions | undefined]
> = async (context, taskId, subject, isAutoSnapshot, options) => {
	assertTestPathDefined(context, 'matchImageSnapshot')

	// vitest:browser passes in `null` when not defined
	if (!options) options = {}
	options.timeout = options.timeout ?? 30000

	const info = visContext.getSnapshotInfo(context as any, taskId, isAutoSnapshot, options)
	const baselineBuffer = await file.tryReadFile(info.baselinePath)
	if (!baselineBuffer) {
		if (isBase64String(subject)) {
			await writeSnapshot(info.baselinePath, subject)
		} else {
			await takeSnapshotByBrowser(context, info.baselinePath, subject, options)
		}
		return
	}

	const resultBuffer = await takeSnapshot(context, info.resultPath, subject, options)
	const baselineImage = PNG.sync.read(baselineBuffer, { skipRescale: true, checkCRC: false })
	const resultImage = PNG.sync.read(resultBuffer, { skipRescale: true, checkCRC: false })
	const [baselineAlignedImage, resultAlignedImage] = alignImageSizes(baselineImage, resultImage)
	const { width, height } = baselineAlignedImage
	const diffImage = new PNG({ width, height })
	const { pass, diffAmount } = compareImage(
		baselineAlignedImage.data,
		resultAlignedImage.data,
		diffImage.data,
		width,
		height,
		options,
	)
	if (pass) {
		if (sizeNotChanged(baselineImage, baselineAlignedImage) && sizeNotChanged(resultImage, resultAlignedImage)) {
			return
		}
		throw new Error(
			dedent`Snapshot \`${taskId}\` mismatched

				The image size changed form ${baselineImage.width}x${baselineImage.height} to ${resultImage.width}x${resultImage.height}

				Expected:   ${resolve(context.project.config.root, info.baselinePath)}
				Actual:     ${resolve(context.project.config.root, info.resultPath)}`,
		)
	}

	if (context.project.config.snapshotOptions.updateSnapshot === 'all') {
		await writeSnapshotBuffer(info.baselinePath, resultImage.data)
		return
	}

	await writeSnapshotBuffer(info.diffPath, diffImage.data)

	throw new Error(
		dedent`Snapshot \`${taskId}\` mismatched

			${
				options?.failureThreshold
					? options?.failureThresholdType === 'percent'
						? `Expected image to match within ${options.failureThreshold}% but was differ by ${diffAmount}%.`
						: `Expected image to match within ${options.failureThreshold} pixels but was differ by ${diffAmount} pixels.`
					: `Expected image to match but was differ by ${options?.failureThresholdType === 'percent' ? `${diffAmount}%` : `${diffAmount} pixels`}.`
			}

			Options:    ${JSON.stringify(options)}

			Expected:   ${resolve(context.project.config.root, info.baselinePath)}
			Actual:     ${resolve(context.project.config.root, info.resultPath)}
			Difference: ${resolve(context.project.config.root, info.diffPath)}`,
	)
}

function alignImageSizes(baseline: PNG, result: PNG) {
	if (isSameSize(baseline, result)) return [baseline, result] as const

	const size = getMaxSize(baseline, result)
	return [resizeImage(baseline, size), resizeImage(result, size)] as const
}

function resizeImage(image: PNG, size: { width: number; height: number }) {
	if (isSameSize(image, size)) return image

	const resized = new PNG(size)
	PNG.bitblt(image, resized, 0, 0, image.width, image.height)
	return resized
}

function sizeNotChanged(baselineImage: PNG, baselineAlignedImage: PNG) {
	return baselineImage === baselineAlignedImage
}
