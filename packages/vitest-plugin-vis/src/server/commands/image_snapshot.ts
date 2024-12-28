import { mkdirp } from 'mkdirp'
import type { BrowserCommand, BrowserCommandContext } from 'vitest/node'
import { isBase64String } from '../../shared/base64.ts'
import { browserApi } from '../browser_provider/browser_api.ts'
import { file } from '../file.ts'
import { visContext } from '../vis_context.ts'

export interface ImageSnapshotCommand {
	/**
	 * Take a snapshot of the current image.
	 *
	 * @param options - The options for the image snapshot.
	 */
	imageSnapshot: (name: string, options?: ImageSnapshotOptions | undefined) => Promise<ImageSnapshotResult>
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
	options,
) => {
	if (!context.testPath) {
		throw new Error('Cannot take snapshot without testPath')
	}

	const state = visContext.getSnapshotInfo(context.testPath, name)
	const base64 = await takeSnapshot(
		context,
		options?.element!,
		{ dir: state.resultDir, path: state.resultPath },
		options,
	)

	return { base64, resultPath: state.resultPath }
}

async function takeSnapshot(
	context: BrowserCommandContext,
	subject: string,
	info: { dir: string; path: string },
	options: ImageSnapshotOptions | undefined,
) {
	await mkdirp(info.dir)
	if (isBase64String(subject)) {
		return writeSnapshot(subject, info)
	}

	const browser = browserApi(context)
	return browser.takeScreenshot(info.path, subject, options)
}

async function writeSnapshot(subject: string, info: { dir: string; path: string }) {
	await file.writeFileBase64(info.path, subject)
	return subject
}
