import { mkdirp } from 'mkdirp'
import type { BrowserCommand, BrowserCommandContext } from 'vitest/node'
import type { ToMatchImageSnapshotOptions } from '../../client/to_match_image_snapshot/to_match_image_snapshot.ts'
import { isBase64String } from '../../shared/base64.ts'
import type { SnapshotInfo } from '../../shared/types.ts'
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
	const info = visContext.getSnapshotInfo(context, taskName)
	const baseline = await file.tryReadFileBase64(info.baselinePath)
	if (!baseline) {
		await saveBaseline(context, subject, info)
		return
	}
	console.info('Matching image snapshot...', info, subject, options)
}

async function saveBaseline(context: BrowserCommandContext, subject: string, info: SnapshotInfo) {
	await mkdirp(info.baselineDir)
	if (isBase64String(subject)) {
		await file.writeFileBase64(info.baselinePath, subject)
	} else {
		const browser = browserApi(context)
		await browser.saveScreenshot(info.baselinePath, subject)
	}
}
