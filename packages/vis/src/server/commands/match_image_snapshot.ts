import { mkdirp } from 'mkdirp'
import type { BrowserCommand, BrowserCommandContext } from 'vitest/node'
import { isBase64String } from '../../shared/base64.ts'
import type { MatchImageSnapshotOptions, SnapshotInfo } from '../../shared/types.ts'
import { browserApi } from '../browsers/browser_api.ts'
import { file } from '../file.ts'
import { visContext } from '../vis_context.ts'

export interface MatchImageSnapshotCommand {
	matchImageSnapshot: (
		taskName: string | undefined,
		subject: string,
		options?: MatchImageSnapshotOptions | undefined,
	) => Promise<void>
}

export const matchImageSnapshot: BrowserCommand<
	[taskName: string, subject: string, options?: MatchImageSnapshotOptions | undefined]
> = async (context, taskName, subject, options) => {
	const info = visContext.getSnapshotInfo(context, taskName)
	const baselineBase64 = await file.tryReadFileBase64(info.baselinePath)
	if (!baselineBase64) {
		await takeSnapshot(context, subject, { dir: info.baselineDir, path: info.baselinePath }, options)
		return
	}

	const _resultBase64 = await takeSnapshot(context, subject, { dir: info.resultDir, path: info.resultPath }, options)
	console.info('Matching image snapshot...', info, subject, options)
}

async function takeSnapshot(
	context: BrowserCommandContext,
	subject: string,
	info: { dir: string; path: string },
	options: MatchImageSnapshotOptions | undefined,
) {
	await mkdirp(info.dir)
	if (isBase64String(subject)) {
		await file.writeFileBase64(info.path, subject)
		return subject
	}

	const browser = browserApi(context)
	return browser.takeScreenshot(info.path, subject, options)
}
