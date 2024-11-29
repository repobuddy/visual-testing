import type { BrowserPage } from '@vitest/browser/context'
import type { ImageSnapshot, ImageSnapshotOptions } from '../../../shared/types.js'
import { toImageData } from '../../image_data.js'
import { state } from '../../state.js'
import { imageSnapshotSymbol } from './constants.js'

export interface ImageSnapshotAction {
	imageSnapshot(this: BrowserPage, options?: ImageSnapshotOptions | undefined): Promise<ImageSnapshot>
}

export async function imageSnapshot(
	this: BrowserPage,
	options?: ImageSnapshotOptions | undefined,
): Promise<ImageSnapshot> {
	const { snapshotFilename, baselinePath, resultPath, diffPath } = state.getSnapshotFilePaths(options)
	// console.debug('taking snapshot', state.getName(), snapshotFilename)
	const screenshot = await this.screenshot({
		base64: true,
		path: resultPath,
		element: options?.element,
		timeout: state.getTimeout(options?.timeout),
	})
	state.incrementSnapshotIndex()
	const image = await toImageData(screenshot.base64)

	return {
		type: imageSnapshotSymbol,
		snapshotFilename,
		baselinePath,
		resultPath,
		diffPath,
		base64: screenshot.base64,
		image,
	}
}
