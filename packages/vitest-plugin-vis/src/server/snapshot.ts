import { mkdirp } from 'mkdirp'
import { dirname } from 'pathe'
import type { BrowserCommandContext } from 'vitest/node'
import { isBase64String } from '../shared/base64.ts'
import type { ImageSnapshotTimeoutOptions, PageImageSnapshotOptions } from '../shared/types.ts'
import { browserApi } from './browser_provider/browser_api.ts'
import { snapshotWriter } from './fs/snapshot_writer.ts'

export async function takeSnapshot(
	context: BrowserCommandContext,
	filePath: string,
	subject: string,
	options: ImageSnapshotTimeoutOptions | undefined,
) {
	if (isBase64String(subject)) {
		await snapshotWriter.writeBase64(filePath, subject)
		return Buffer.from(subject, 'base64')
	}
	return takeSnapshotByBrowser(context, filePath, subject, options)
}

export async function takeSnapshotByBrowser(
	context: BrowserCommandContext,
	filePath: string,
	subject: string,
	options: ImageSnapshotTimeoutOptions | undefined,
) {
	await mkdirp(dirname(filePath))
	const browser = browserApi(context)
	return browser.takeScreenshot(filePath, subject ?? 'body', {
		timeout: options?.timeout,
	})
}

export async function takePageSnapshot(
	context: BrowserCommandContext,
	filePath: string,
	options: (PageImageSnapshotOptions & ImageSnapshotTimeoutOptions) | undefined,
) {
	await mkdirp(dirname(filePath))
	const browser = browserApi(context)
	return browser.takePageScreenshot(filePath, {
		timeout: options?.timeout,
		fullPage: options?.fullPage,
	})
}
