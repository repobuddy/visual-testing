import type { BrowserCommand } from 'vitest/node'
import { isBase64String } from '../../shared/base64.ts'
import type {
	FailureThresholdOptions,
	ImageSnapshotTimeoutOptions,
	PixelComparisonOptions,
	SsimComparisonOptions,
} from '../../shared/types.ts'
import { file } from '../file.ts'
import { takeSnapshot, takeSnapshotByBrowser, writeSnapshot } from '../snapshot.ts'
import { visContext } from '../vis_context.ts'
import { assertTestPathDefined } from './_assertions.ts'
import type { MatchImageSnapshotOptions } from './match_image_snapshot.ts'

type ImageSnapshotComparisonInfo = {
	projectRoot: string
	baselinePath: string
	resultPath: string
	diffPath: string
	baseline: string
	result: string
} & ImageSnapshotTimeoutOptions &
	FailureThresholdOptions &
	(SsimComparisonOptions | PixelComparisonOptions)

export interface PrepareImageSnapshotComparisonCommand {
	prepareImageSnapshotComparison: (
		taskId: string | undefined,
		subject: string,
		options?: MatchImageSnapshotOptions | undefined,
	) => Promise<ImageSnapshotComparisonInfo | undefined>
}

export const prepareImageSnapshotComparison: BrowserCommand<
	[taskId: string, snapshotId: string, options?: MatchImageSnapshotOptions | undefined]
> = async (context, taskId, subject, options) => {
	assertTestPathDefined(context, 'prepareImageSnapshotComparison')

	// vitest:browser passes in `null` when not defined
	if (!options) options = {}
	options.timeout = options.timeout ?? 30000

	const info = visContext.getSnapshotInfo(context.testPath, taskId, options)
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
	return {
		...info,
		projectRoot: context.project.config.root,
		baseline: baselineBuffer.toString('base64'),
		result: resultBuffer.toString('base64'),
	}
}
