// import type { Locator } from '@vitest/browser/context'

export interface ImageSnapshotOptions extends CustomizeSnapshotIdOptions {
	element?: Element //| Locator
	/**
	 * Timeout for taking the snapshot.
	 *
	 * Default: 30000
	 */
	timeout?: number | undefined
}

export type CustomizeSnapshotIdOptions = {
	/**
	 * Customize the snapshot id. This is used as the filename of the snapshot:
	 *
	 * `${snapshotId}.png`
	 *
	 * @param id The id of the snapshot.
	 * @param index The index of the snapshot.
	 */
	customizeSnapshotId?: (id: string, index: number) => string
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
