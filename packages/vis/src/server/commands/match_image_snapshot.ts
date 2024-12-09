import type { Locator } from '@vitest/browser/context'
import { mkdirp } from 'mkdirp'
import type { BrowserCommand } from 'vitest/node'
import type { ToMatchImageSnapshotOptions } from '../../client/to_match_image_snapshot/to_match_image_snapshot.js'
import { isBase64String } from '../../shared/base64.js'
import { browserApi } from '../browsers/browser_api.js'
import { file } from '../file.js'
import { visContext } from '../vis_context.js'

export interface MatchImageSnapshotCommand {
	matchImageSnapshot: (
		taskName: string | undefined,
		subject: string,
		options?: ToMatchImageSnapshotOptions | undefined,
	) => Promise<void>
}

export const matchImageSnapshot: BrowserCommand<
	[taskName: string | undefined, subject: string, options?: ToMatchImageSnapshotOptions | undefined]
> = async (context, taskName, subject, options) => {
	const meta = visContext.getSnapshotInfo(context, taskName)
	const baseline = await file.tryReadBase64(meta.baselinePath)
	if (!baseline) {
		await mkdirp(meta.baselineDir)
		if (isBase64String(subject)) {
			await file.writeFile(meta.baselinePath, subject)
		} else {
			const browser = browserApi(context)
			await browser.saveScreenshot(meta.baselinePath, subject)
		}
		return
	}
	console.info('Matching image snapshot...', meta, subject, options)
}
