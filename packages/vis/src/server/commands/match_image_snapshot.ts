import { mkdirp } from 'mkdirp'
import { PNG } from 'pngjs'
import type { BrowserCommand, BrowserCommandContext } from 'vitest/node'
import { isBase64String } from '../../shared/base64.ts'
import type { MatchImageSnapshotOptions } from '../../shared/types.ts'
import { browserApi } from '../browsers/browser_api.ts'
import { compareImage } from '../compare_image.ts'
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
	// vitest:browser passes in `null` when not defined
	if (!options) options = {}

	const info = visContext.getSnapshotInfo(context, taskName)
	const baselineBase64 = await file.tryReadFileBase64(info.baselinePath)
	if (!baselineBase64) {
		await takeSnapshot(context, subject, { dir: info.baselineDir, path: info.baselinePath }, options)
		return
	}

	const resultBase64 = await takeSnapshot(context, subject, { dir: info.resultDir, path: info.resultPath }, options)
	const baselineImage = PNG.sync.read(Buffer.from(baselineBase64, 'base64'))
	const resultImage = PNG.sync.read(Buffer.from(resultBase64, 'base64'))

	const { pass } = compareImage(baselineImage, resultImage, options)
	if (pass) return

	// const diffBase64 = PNG.sync.write(diffImage).toString('base64')
	// await writeSnapshot(diffBase64, { dir: info.diffDir, path: info.diffPath })

	console.info('Comparing images...', resultImage)
	console.info('Matching image snapshot...', info, subject, options)
}

async function takeSnapshot(
	context: BrowserCommandContext,
	subject: string,
	info: { dir: string; path: string },
	options: MatchImageSnapshotOptions | undefined,
) {
	if (isBase64String(subject)) {
		return writeSnapshot(subject, info)
	}

	await mkdirp(info.dir)
	const browser = browserApi(context)
	return browser.takeScreenshot(info.path, subject, options)
}

async function writeSnapshot(subject: string, info: { dir: string; path: string }) {
	await mkdirp(info.dir)
	await file.writeFileBase64(info.path, subject)
	return subject
}
