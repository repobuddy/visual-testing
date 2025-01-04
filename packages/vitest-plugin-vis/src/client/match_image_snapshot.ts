import { commands } from '@vitest/browser/context'
import dedent from 'dedent'
import { resolve } from 'pathe'
import type { Task } from 'vitest'
import { isBase64String } from '../shared/base64.ts'
import { compareImage } from '../shared/compare_image.ts'
import { alignImagesToSameSize } from './align_images.ts'
import type { ToMatchImageSnapshotOptions } from './expect/to_match_image_snapshot.types.ts'
import { toDataURL, toImageData } from './image_data.ts'
import { prettifyOptions } from './match_image_snapshot.logic.ts'
import { convertElementToCssSelector } from './selector.ts'
import { toTaskId } from './task_id.ts'
import { server } from './vitest_browser_context_proxy.ts'

export async function matchImageSnapshot(test: Task, subject: any, options?: ToMatchImageSnapshotOptions) {
	const taskId = toTaskId(test)
	const info = await commands.prepareImageSnapshotComparison(
		taskId,
		parseImageSnapshotSubject(subject),
		options?.customizeSnapshotId ? await parseImageSnapshotOptions(taskId, options) : options,
	)

	if (!info) return

	const baselineImage = await toImageData(info.baseline)
	const resultImage = await toImageData(info.result)
	const [baselineAlignedImage, resultAlignedImage] = alignImagesToSameSize(baselineImage, resultImage)
	const { width, height } = baselineAlignedImage
	const diffImage = new ImageData(width, height)
	const { pass, diffAmount } = compareImage(
		baselineAlignedImage.data,
		resultAlignedImage.data,
		diffImage.data,
		width,
		height,
		options,
	)
	if (pass) return
	if (server.config.snapshotOptions.updateSnapshot === 'all') {
		await writeSnapshot(info.baselinePath, resultImage)
		return
	}

	await writeSnapshot(info.diffPath, diffImage)

	throw new Error(
		dedent`Snapshot \`${taskId}\` mismatched

			${
				options?.failureThreshold
					? options?.failureThresholdType === 'percent'
						? `Expected image to match within ${options.failureThreshold}% but was differ by ${diffAmount}%.`
						: `Expected image to match within ${options.failureThreshold} pixels but was differ by ${diffAmount} pixels.`
					: `Expected image to match but was differ by ${options?.failureThresholdType === 'percent' ? `${diffAmount}%` : `${diffAmount} pixels`}.`
			}

			Options:    ${prettifyOptions(options)}

			Expected:   ${resolve(info.projectRoot, info.baselinePath)}
			Actual:     ${resolve(info.projectRoot, info.resultPath)}
			Difference: ${resolve(info.projectRoot, info.diffPath)}`,
	)
}

/**
 * @deprecated internalized. Use `matchImageSnapshot` directly instead.
 */
export function parseImageSnapshotSubject(subject: any) {
	if (subject instanceof Element) return convertElementToCssSelector(subject)
	if (subject?.['selector']) return subject['selector']
	if (isBase64String(subject)) return subject
	throw new Error(
		`'toMatchImageSnapshot()' expects the subject to be an element, locator, or image encoded in base64 string, but got: ${subject}`,
	)
}

async function writeSnapshot(path: string, image: ImageData) {
	const content = (await toDataURL(image)).split(',')[1]!
	return commands.writeImageSnapshot(path, content)
}

async function parseImageSnapshotOptions(taskId: string, options: ToMatchImageSnapshotOptions) {
	const index = await commands.imageSnapshotNextIndex(taskId)
	const { customizeSnapshotId, ...rest } = options
	const snapshotFileId = customizeSnapshotId!(taskId, index)
	return { ...rest, snapshotFileId }
}
