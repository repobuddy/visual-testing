import { readFile, writeFile } from 'node:fs/promises'

export const file = {
	async tryReadBase64(filePath: string): Promise<string | undefined> {
		return readFile(filePath, { encoding: 'base64' }).catch(() => undefined)
	},
	writeFile(filePath: string, data: string) {
		return writeFile(filePath, data)
	},
}
