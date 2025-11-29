import { mkdirp } from 'mkdirp'
import { dirname, resolve } from 'pathe'
import { isBase64String } from '../shared/base64.ts'
import type { ImageSnapshotTimeoutOptions, PageImageSnapshotOptions } from '../shared/types.ts'
import { browserApi } from './browser_provider/browser_api.ts'
import { snapshotWriter } from './snapshot_writer.ts'
import type { ExtendedBrowserCommandContext } from './vis_server_context.types.ts'

export async function takeSnapshot(
	context: ExtendedBrowserCommandContext,
	projectRoot: string,
	relativeFilePath: string,
	subject: string,
	options: ImageSnapshotTimeoutOptions | undefined,
) {
	if (isBase64String(subject)) {
		await snapshotWriter.writeBase64(resolve(projectRoot, relativeFilePath), subject)
		return Buffer.from(subject, 'base64')
	}
	return takeSnapshotByBrowser(context, projectRoot, relativeFilePath, subject, options)
}

export async function takeSnapshotByBrowser(
	context: ExtendedBrowserCommandContext,
	projectRoot: string,
	relativeFilePath: string,
	subject: string,
	options: ImageSnapshotTimeoutOptions | undefined,
) {
	const filePath = resolve(projectRoot, relativeFilePath)
	await mkdirp(dirname(filePath))
	const browser = browserApi(context)
	return browser.takeScreenshot(projectRoot, relativeFilePath, subject ?? 'body', {
		timeout: options?.timeout,
	})
}

export async function takePageSnapshot(
	context: ExtendedBrowserCommandContext,
	projectRoot: string,
	relativeFilePath: string,
	options: (PageImageSnapshotOptions & ImageSnapshotTimeoutOptions) | undefined,
) {
	const filePath = resolve(projectRoot, relativeFilePath)
	await mkdirp(dirname(filePath))
	const browser = browserApi(context)
	return browser.takePageScreenshot(projectRoot, relativeFilePath, {
		timeout: options?.timeout,
		fullPage: options?.fullPage,
	})
}
