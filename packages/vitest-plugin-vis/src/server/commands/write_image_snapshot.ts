import { mkdirp } from 'mkdirp'
import { dirname, isAbsolute } from 'pathe'
import type { BrowserCommand } from 'vitest/node'
import { file } from '../file.ts'
import { assertIsRelativePath } from './_assertions.ts'

export interface WriteImageSnapshotCommand {
	/**
	 * Writes the image snapshot to the file system.
	 * @param relativeFilePath The file path to write the image snapshot to.
	 * It is relative to the project root.
	 * @param imageBase64 The base64 encoded image.
	 */
	writeImageSnapshot(relativeFilePath: string, imageBase64: string): Promise<void>
}

export const writeImageSnapshot: BrowserCommand<[relativeFilePath: string, imageBase64: string]> = async (
	_,
	relativeFilePath,
	imageBase64,
) => {
	assertIsRelativePath(relativeFilePath, 'relativeFilePath')

	await mkdirp(dirname(relativeFilePath))
	await file.writeFile(relativeFilePath, imageBase64, { encoding: 'base64' })
}
