import { mkdirp } from 'mkdirp'
import { dirname } from 'pathe'
import type { BrowserCommand } from 'vitest/node'
import { file } from '../file.ts'

export interface WriteImageSnapshotCommand {
	writeImageSnapshot(taskId: string, snapshotId?: string | undefined): Promise<boolean>
}

export const writeImageSnapshot: BrowserCommand<[filePath: string, base64: string]> = async (
	context,
	filePath,
	base64,
) => {
	if (!context.testPath) {
		throw new Error('Cannot take snapshot without testPath')
	}
	await mkdirp(dirname(filePath))
	await file.writeFile(filePath, base64, { encoding: 'base64' })
}
