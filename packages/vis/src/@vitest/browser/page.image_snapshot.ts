import type { BrowserPage } from '@vitest/browser/context'
import { join } from 'pathe'
import { toImageData } from '../../image_data.js'
import { state } from '../../state.js'
import { imageSnapshotSymbol } from './constants.js'
import type { ImageSnapshot, ImageSnapshotOptions } from './types.js'

export async function imageSnapshot(this: BrowserPage, options?: ImageSnapshotOptions): Promise<ImageSnapshot> {
	const snapshotFilename = `${state.snapshotId}-${state.snapshot[state.snapshotId]!.index++}.png`
	const baselinePath = join(state.baselineDir, snapshotFilename)
	const resultPath = join(state.resultDir, snapshotFilename)
	const diffPath = join(state.diffDir, snapshotFilename)
	const screenshot = await this.screenshot({
		base64: true,
		path: resultPath,
		element: options?.element,
	})
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
