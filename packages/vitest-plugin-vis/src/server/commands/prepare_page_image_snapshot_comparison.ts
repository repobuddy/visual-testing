import { resolve } from 'pathe'
import type { BrowserCommand } from 'vitest/node'
import type {
	FailureThresholdOptions,
	ImageSnapshotTimeoutOptions,
	PixelComparisonOptions,
	SsimComparisonOptions,
} from '../../shared/types.ts'
import { file } from '../externals/file.ts'
import { getProjectRoot } from '../project.ts'
import { takePageSnapshot } from '../snapshot.ts'
import { visServerContext } from '../vis_server_context.ts'
import { assertTestPathDefined } from './_assertions.ts'
import type { MatchImageSnapshotOptions } from './types.ts'

type ImageSnapshotComparisonInfo = {
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

export interface PreparePageImageSnapshotComparisonCommand {
	preparePageImageSnapshotComparison: (
		taskId: string,
		isAutoSnapshot: boolean,
		options?: MatchImageSnapshotOptions | undefined,
	) => Promise<ImageSnapshotComparisonInfo | undefined>
}

export const preparePageImageSnapshotComparison: BrowserCommand<
	Parameters<PreparePageImageSnapshotComparisonCommand['preparePageImageSnapshotComparison']>
> = async (context, taskId, isAutoSnapshot, options) => {
	assertTestPathDefined(context, 'preparePageImageSnapshotComparison')
	// vitest:browser passes in `null` when not defined
	if (!options) options = {}
	options.timeout = options.timeout ?? 30000

	const projectRoot = getProjectRoot(context)
	const info = await visServerContext.getSnapshotInfo(context, taskId, isAutoSnapshot, options)
	const baselineBuffer = await file.tryReadFile(resolve(projectRoot, info.baselinePath))
	if (!baselineBuffer) {
		await takePageSnapshot(context, resolve(projectRoot, info.baselinePath), options)
		return
	}

	const resultBuffer = await takePageSnapshot(context, resolve(projectRoot, info.resultPath), options)
	return {
		...info,
		projectRoot,
		baseline: baselineBuffer.toString('base64'),
		result: resultBuffer.toString('base64'),
	}
}
