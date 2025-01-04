import { mkdirp } from 'mkdirp'
import { dirname } from 'pathe'
import type { BrowserCommandContext } from 'vitest/node'
import type { ImageSnapshotTimeoutOptions } from '../client.ts'
import { isBase64String } from '../shared/base64.ts'
import { browserApi } from './browser_provider/browser_api.ts'
import { file } from './file.js'

export async function takeSnapshot(
	context: BrowserCommandContext,
	filePath: string,
	subject: string,
	options: ImageSnapshotTimeoutOptions | undefined,
) {
	if (isBase64String(subject)) {
		await writeSnapshot(filePath, subject)
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

export async function writeSnapshot(filePath: string, subject: string) {
	await mkdirp(dirname(filePath))
	await file.writeFile(filePath, subject, { encoding: 'base64' })
}
export async function writeSnapshotBuffer(filePath: string, subject: Buffer) {
	await mkdirp(dirname(filePath))
	await file.writeFile(filePath, subject)
}
