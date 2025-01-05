import dedent from 'dedent'
import { resolve } from 'pathe'
import type { Task } from 'vitest'
import type { ImageSnapshotNextIndexCommand } from '../commands.ts'
import type { PrepareImageSnapshotComparisonCommand } from '../server/commands/prepare_image_snapshot_comparison.ts'
import type { WriteImageSnapshotCommand } from '../server/commands/write_image_snapshot.ts'
import { isBase64String } from '../shared/base64.ts'
import { compareImage } from '../shared/compare_image.ts'
import { alignImagesToSameSize } from './align_images.ts'
import type { ToMatchImageSnapshotOptions } from './expect/to_match_image_snapshot.types.ts'
import { toDataURL, toImageData } from './image_data.ts'
import { prettifyOptions } from './match_image_snapshot.logic.ts'
import { convertElementToCssSelector } from './selector.ts'
import { toTaskId } from './task_id.ts'
import { server } from './vitest_browser_context_proxy.ts'

export function imageSnapshotMatcher(
	commands: PrepareImageSnapshotComparisonCommand & WriteImageSnapshotCommand & ImageSnapshotNextIndexCommand,
) {
	return async function matchImageSnapshot(test: Task, subject: any, options?: ToMatchImageSnapshotOptions) {
		const taskId = toTaskId(test)
		const info = await commands.prepareImageSnapshotComparison(
			taskId,
			parseImageSnapshotSubject(subject),
			options?.customizeSnapshotId ? await parseImageSnapshotOptions(commands, taskId, options) : options,
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
		if (pass) {
			if (options?.expectToFail) {
				throw new Error(
					dedent`Snapshot \`${taskId}\` matched but expected to fail.

							Options:    ${prettifyOptions(options)}
							DiffAmount: ${options.failureThresholdType === 'percent' ? `${diffAmount}%` : `${diffAmount} pixels`}

							Expected:   ${resolve(info.projectRoot, info.baselinePath)}
							Actual:     ${resolve(info.projectRoot, info.resultPath)}`,
				)
			}
			return
		}
		if (server.config.snapshotOptions.updateSnapshot === 'all') {
			await writeSnapshot(commands, info.baselinePath, resultImage)
			return
		}

		await writeSnapshot(commands, info.diffPath, diffImage)

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

async function writeSnapshot(commands: WriteImageSnapshotCommand, path: string, image: ImageData) {
	const content = (await toDataURL(image)).split(',')[1]!
	return commands.writeImageSnapshot(path, content)
}

async function parseImageSnapshotOptions(
	commands: ImageSnapshotNextIndexCommand,
	taskId: string,
	options: ToMatchImageSnapshotOptions,
) {
	const index = await commands.imageSnapshotNextIndex(taskId)
	const { customizeSnapshotId, ...rest } = options
	const snapshotFileId = customizeSnapshotId!(taskId, index)
	return { ...rest, snapshotFileId }
}
