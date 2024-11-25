import type { BrowserCommand } from 'vitest/node'
import { imageSnapshotSymbol } from '../../@vitest/browser/constants'
import type { ImageSnapshotOptions } from '../../@vitest/browser/types'
export interface ImageSnapshotCommand {
	imageSnapshot: (
		taskName: string,
		options?: ImageSnapshotOptions,
	) => Promise<{
		snapshotFilename: string
		baselinePath: string
		resultPath: string
		diffPath: string
		timeout: number
	}>
}

export const imageSnapshot: BrowserCommand<[taskName: string, options?: ImageSnapshotOptions | undefined]> = async (
	context,
	_taskName,
	_options,
) => {
	if (!context.testPath) {
		throw new Error('Cannot take a screenshot without a test path')
	}
	// console.info('imageSnapshot', Object.keys(context.context), _taskName)
	return {
		type: imageSnapshotSymbol,
		snapshotFilename: '',
		baselinePath: '',
		resultPath: '',
		diffPath: '',
		base64: '',
	}
}
