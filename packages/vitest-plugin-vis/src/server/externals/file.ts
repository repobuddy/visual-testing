import { mkdirp } from 'mkdirp'
import { readFile, stat, writeFile } from 'node:fs/promises'

export const file = {
	existFile(filePath: string) {
		return stat(filePath)
			.then((s) => s.isFile())
			.catch(() => false)
	},
	mkdirp: mkdirp as (path: string) => Promise<string | undefined>,
	async tryReadFile(filePath: string): Promise<Buffer | undefined> {
		return readFile(filePath).catch(() => undefined)
	},
	writeFile,
}
