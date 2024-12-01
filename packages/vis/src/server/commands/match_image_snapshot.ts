import type { Locator } from '@vitest/browser/locator'
import type { BrowserCommand } from 'vitest/node'
import type { ToMatchImageSnapshotOptions } from '../../client/to_match_image_snapshot/to_match_image_snapshot'
import { file } from '../file'
import { visContext } from '../vis_context'

export interface MatchImageSnapshotCommand {
	matchImageSnapshot: (
		taskName: string | undefined,
		subject: Element | Locator | string,
		options?: ToMatchImageSnapshotOptions | undefined,
	) => Promise<void>
}

export const matchImageSnapshot: BrowserCommand<
	[taskName: string | undefined, subject: Element | Locator | string, options?: ToMatchImageSnapshotOptions | undefined]
> = async (context, taskName, subject, options) => {
	const meta = visContext.getSnapshotInfo(context, taskName)
	const baseline = await file.tryReadBase64(meta.baselinePath)
	if (!baseline) {
		console.info(`No baseline image found at ${meta.baselinePath}`)
	}
	console.info('Matching image snapshot...', meta, subject, options)
}
