import dedent from 'dedent'
import ci from 'is-ci'
import { mkdirp } from 'mkdirp'
import { dirname, resolve } from 'pathe'
import { PNG } from 'pngjs'
import type { BrowserCommand, BrowserCommandContext } from 'vitest/node'
import { isBase64String } from '../../shared/base64.ts'
import { getMaxSize } from '../../shared/get_max_size.ts'
import { isSameSize } from '../../shared/is_same_size.ts'
import type {
	ImageSnapshotCompareOptions,
	ImageSnapshotIdOptions,
	ImageSnapshotTimeoutOptions,
} from '../../shared/types.ts'
import { browserApi } from '../browser_provider/browser_api.ts'
import { compareImage } from '../compare_image.ts'
import { file } from '../file.ts'
import { visContext } from '../vis_context.ts'

export interface MatchImageSnapshotCommand {
	matchImageSnapshot: (
		taskId: string | undefined,
		subject: string,
		options?: MatchImageSnapshotOptions | undefined,
	) => Promise<void>
}

export interface MatchImageSnapshotOptions
	extends ImageSnapshotTimeoutOptions,
		ImageSnapshotIdOptions,
		ImageSnapshotCompareOptions {
	/**
	 * The snapshot file id calculated on the client side.
	 */
	snapshotFileId?: string | undefined
}

export const matchImageSnapshot: BrowserCommand<
	[taskId: string, subject: string, options?: MatchImageSnapshotOptions | undefined]
> = async (context, taskId, subject, options) => {
	if (!context.testPath) {
		throw new Error('Cannot match snapshot without testPath')
	}

	// vitest:browser passes in `null` when not defined
	if (!options) options = {}
	options.timeout = options.timeout ?? (ci ? 30000 : 5000)

	const info = visContext.getSnapshotInfo(context.testPath, taskId, options)
	const baselineBuffer = await file.tryReadFile(info.baselinePath)
	if (!baselineBuffer) {
		await takeSnapshot(context, subject, info.baselinePath, options)
		return
	}

	const resultBuffer = await takeSnapshot(context, subject, info.resultPath, options)
	const baselineImage = PNG.sync.read(baselineBuffer)
	const resultImage = PNG.sync.read(resultBuffer)
	const [baselineAlignedImage, resultAlignedImage] = alignImageSizes(baselineImage, resultImage)

	const { pass, diffAmount, diffImage } = compareImage(baselineAlignedImage, resultAlignedImage, options)
	if (pass) {
		if (sizeNotChanged(baselineImage, baselineAlignedImage) && sizeNotChanged(resultImage, resultAlignedImage)) {
			return
		}
		throw new Error(
			dedent`Snapshot \`${taskId}\` mismatched

				The image size changed form ${baselineImage.width}x${baselineImage.height} to ${resultImage.width}x${resultImage.height}

				Expected:   ${resolve(context.project.runner.root, info.baselinePath)}
				Actual:     ${resolve(context.project.runner.root, info.resultPath)}`,
		)
	}

	const diffBase64 = PNG.sync.write(diffImage).toString('base64')
	await writeSnapshot(diffBase64, info.diffPath)

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

			Expected:   ${resolve(context.project.runner.root, info.baselinePath)}
			Actual:     ${resolve(context.project.runner.root, info.resultPath)}
			Difference: ${resolve(context.project.runner.root, info.diffPath)}`,
	)
}

async function takeSnapshot(
	context: BrowserCommandContext,
	subject: string,
	filePath: string,
	options: ImageSnapshotTimeoutOptions | undefined,
) {
	if (isBase64String(subject)) {
		return Buffer.from(await writeSnapshot(subject, filePath), 'base64')
	}

	await mkdirp(dirname(filePath))
	const browser = browserApi(context)
	return browser.takeScreenshot(filePath, subject, {
		timeout: options?.timeout,
	})
}

async function writeSnapshot(subject: string, filePath: string) {
	await mkdirp(dirname(filePath))
	await file.writeFileBase64(filePath, subject)
	return subject
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
