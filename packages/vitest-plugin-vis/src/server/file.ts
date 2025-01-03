import { readFile, stat, writeFile } from 'node:fs/promises'

export const file = {
	async tryReadFile(filePath: string): Promise<Buffer | undefined> {
		return readFile(filePath).catch(() => undefined)
	},
	writeFile,
	existFile(filePath: string) {
		return stat(filePath)
			.then((s) => s.isFile())
			.catch(() => false)
	},
}
