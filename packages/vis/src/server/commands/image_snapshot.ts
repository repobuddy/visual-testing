import type { BrowserCommand } from 'vitest/node'
import type { ImageSnapshot, ImageSnapshotOptions } from '../../shared/types'
import { visContext } from '../vis_context'

export interface ImageSnapshotCommand {
	/**
	 * Take a snapshot of the current image.
	 *
	 * @param options - The options for the image snapshot.
	 */
	imageSnapshot: (name: string, options?: ImageSnapshotOptions) => Promise<ImageSnapshot>
}

export const imageSnapshot: BrowserCommand<[name: string, options?: ImageSnapshotOptions | undefined]> = async (
	context,
	name,
	_options,
) => {
	const state = visContext.getState(context, name)
	console.info('taking snapshot', state)
}
