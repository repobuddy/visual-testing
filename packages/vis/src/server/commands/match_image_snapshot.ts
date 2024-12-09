import type { Locator } from '@vitest/browser/context'
import { mkdirp } from 'mkdirp'
import type { BrowserCommand } from 'vitest/node'
import type { ToMatchImageSnapshotOptions } from '../../client/to_match_image_snapshot/to_match_image_snapshot.ts'
import { isBase64String } from '../../shared/base64.ts'
import { browserApi } from '../browsers/browser_api.ts'
import { file } from '../file.ts'
import { visContext } from '../vis_context.ts'

export interface MatchImageSnapshotCommand {
	matchImageSnapshot: (
		taskName: string | undefined,
		subject: string,
		options?: ToMatchImageSnapshotOptions | undefined,
	) => Promise<void>
}

export const matchImageSnapshot: BrowserCommand<
	[taskName: string, subject: string, options?: ToMatchImageSnapshotOptions | undefined]
> = async (context, taskName, subject, options) => {
	const meta = visContext.getSnapshotInfo(context, taskName)
	const baseline = await file.tryReadFileBase64(meta.baselinePath)
	if (!baseline) {
		await mkdirp(meta.baselineDir)
		if (isBase64String(subject)) {
			await file.writeFileBase64(meta.baselinePath, subject)
		} else {
			const browser = browserApi(context)
			await browser.saveScreenshot(meta.baselinePath, subject)
		}
		return
	}
	console.info('Matching image snapshot...', meta, subject, options)
}
