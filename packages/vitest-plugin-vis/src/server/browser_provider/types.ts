import type { ImageSnapshotOptions, ImageSnapshotTimeoutOptions } from '../../client.ts'

export interface BrowserApi {
	takeScreenshot(
		filePath: string,
		selector: string,
		options: (ImageSnapshotOptions & ImageSnapshotTimeoutOptions) | undefined,
	): Promise<Buffer>
}
