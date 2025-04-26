import { resolve } from 'pathe'
import type { BrowserCommand } from 'vitest/node'
import { isBase64String } from '../../shared/base64.ts'
import type {
	FailureThresholdOptions,
	ImageSnapshotTimeoutOptions,
	PixelComparisonOptions,
	SsimComparisonOptions,
} from '../../shared/types.ts'
import { file } from '../externals/file.ts'
import { getProjectRoot } from '../project.ts'
import { takeSnapshot, takeSnapshotByBrowser } from '../snapshot.ts'
import { snapshotWriter } from '../snapshot_writer.ts'
import { visServerContext } from '../vis_server_context.ts'
import { assertTestPathDefined } from './_assertions.ts'
import type { MatchImageSnapshotOptions } from './types.ts'

export type ImageSnapshotComparisonInfo = {
	/**
	 * Path to the project root.
	 */
	projectRoot: string
	/**
	 * Path to the baseline image relative to the project root.
	 */
	baselinePath: string
	/**
	 * Path to the result image relative to the project root.
	 */
	resultPath: string
	/**
	 * Path to the diff image relative to the project root.
	 */
	diffPath: string
	/**
	 * Base64 encoded baseline image.
	 */
	baseline: string
	/**
	 * Base64 encoded result image.
	 */
	result: string
} & ImageSnapshotTimeoutOptions &
	FailureThresholdOptions &
	(SsimComparisonOptions | PixelComparisonOptions)

export interface PrepareImageSnapshotComparisonCommand {
	prepareImageSnapshotComparison: (
		taskId: string,
		subject: string,
		options?: MatchImageSnapshotOptions | undefined,
	) => Promise<ImageSnapshotComparisonInfo | undefined>
}

export const prepareImageSnapshotComparison: BrowserCommand<
	Parameters<PrepareImageSnapshotComparisonCommand['prepareImageSnapshotComparison']>
> = async (context, taskId, subject, options) => {
	assertTestPathDefined(context, 'prepareImageSnapshotComparison')
	// vitest:browser passes in `null` when not defined
	if (!options) options = {}
	options.timeout = options.timeout ?? 30000

	const projectRoot = getProjectRoot(context)
	const info = await visServerContext.getSnapshotInfo(context, taskId, options)
	const baselineBuffer = await file.tryReadFile(resolve(projectRoot, info.baselinePath))
	if (!baselineBuffer) {
		if (isBase64String(subject)) {
			await snapshotWriter.writeBase64(resolve(projectRoot, info.baselinePath), subject)
		} else {
			await takeSnapshotByBrowser(context, resolve(projectRoot, info.baselinePath), subject, options)
		}
		return
	}

	const resultBuffer = await takeSnapshot(context, resolve(projectRoot, info.resultPath), subject, options)
	return {
		...info,
		projectRoot,
		baseline: baselineBuffer.toString('base64'),
		result: resultBuffer.toString('base64'),
	}
}
