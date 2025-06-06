import type { BrowserCommands } from '@vitest/browser/context'
import dedent from 'dedent'
import { resolve } from 'pathe'
import type { ImageSnapshotNextIndexCommand } from '../commands.ts'
import type {
	ImageSnapshotComparisonInfo,
	PrepareImageSnapshotComparisonCommand,
} from '../server/commands/prepare_image_snapshot_comparison.ts'
import { compareImage } from '../shared/compare_image.ts'
import type { ToMatchImageSnapshotOptions } from '../shared/types.ts'
import { alignImagesToSameSize } from './align_images.ts'
import { prettifyOptions } from './compare_image_snapshot.logic.ts'
import { toDataURL, toImageData } from './image_data.ts'
import { server } from './vitest_browser_context_proxy.ts'

export async function compareImageSnapshot(
	commands: BrowserCommands & PrepareImageSnapshotComparisonCommand & ImageSnapshotNextIndexCommand,
	taskId: string,
	info: ImageSnapshotComparisonInfo,
	options?: ToMatchImageSnapshotOptions<any>,
) {
	options = { ...info, ...options } as any

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
							Diff:       ${options.failureThresholdType === 'percent' ? `${diffAmount}%` : `${diffAmount} pixels`}

							Expected:   ${resolve(info.projectRoot, info.baselinePath)}
							Actual:     ${resolve(info.projectRoot, info.resultPath)}`,
			)
		}
		return
	}
	if (server.config.snapshotOptions.updateSnapshot === 'all' && !options?.expectToFail) {
		await writeSnapshot(commands, resolve(info.projectRoot, info.baselinePath), resultImage)
		return
	}

	await writeSnapshot(commands, resolve(info.projectRoot, info.diffPath), diffImage)

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

					Expected:   ${resolve(info.projectRoot, info.baselinePath)}
					Actual:     ${resolve(info.projectRoot, info.resultPath)}
					Difference: ${resolve(info.projectRoot, info.diffPath)}`,
	)
}

async function writeSnapshot(commands: BrowserCommands, path: string, image: ImageData) {
	const content = (await toDataURL(image)).split(',')[1]!
	return commands.writeFile(path, content, { encoding: 'base64' })
}
