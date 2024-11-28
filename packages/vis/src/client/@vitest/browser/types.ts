import type { Locator } from '@vitest/browser/context'

import type { CustomizeSnapshotIdOptions } from '../../../shared/types'

export interface ImageSnapshotOptions extends CustomizeSnapshotIdOptions {
	element?: Element | Locator
	/**
	 * Timeout for taking the snapshot.
	 *
	 * Default: 30000
	 */
	timeout?: number | undefined
}

export type ImageSnapshot = {
	type: symbol
	snapshotFilename: string
	baselinePath: string
	resultPath: string
	diffPath: string
	base64: string
	image: ImageData
}
