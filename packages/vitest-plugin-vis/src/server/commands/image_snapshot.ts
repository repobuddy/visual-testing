import type { BrowserCommand } from 'vitest/node'
import { visContext } from '../vis_context.ts'

export interface ImageSnapshotCommand {
	/**
	 * Take a snapshot of the current image.
	 *
	 * @param options - The options for the image snapshot.
	 */
	imageSnapshot: (name: string, options?: ImageSnapshotOptions) => Promise<ImageSnapshotResult>
}

type ImageSnapshotOptions = {
	element?: string | undefined
	/**
	 * Timeout for taking the snapshot.
	 *
	 * Default: 30000
	 */
	timeout?: number | undefined
}

type ImageSnapshotResult = {
	base64: string
	resultPath: string
}

export const imageSnapshot: BrowserCommand<[name: string, options?: ImageSnapshotOptions | undefined]> = async (
	context,
	name,
	_options,
) => {
	if (!context.testPath) {
		throw new Error('Cannot take snapshot without testPath')
	}

	const state = visContext.getSnapshotInfo(context.testPath, name)
	console.info('taking snapshot', state)
}
