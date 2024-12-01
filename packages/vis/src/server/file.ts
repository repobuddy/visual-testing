import { readFile } from 'node:fs/promises'

export const file = {
	async tryReadBase64(filePath: string) {
		return readFile(filePath, { encoding: 'base64' }).catch(() => undefined)
	},
}
