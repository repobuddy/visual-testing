import { mkdirp } from 'mkdirp'
import { writeFile } from 'node:fs/promises'
import { dirname } from 'pathe'

export interface SnapshotWriter {
	writeBase64(filePath: string, data: string): Promise<void>
	writeBuffer(filePath: string, data: Buffer): Promise<void>
}

export const snapshotWriter: SnapshotWriter = {
	async writeBase64(filePath: string, data: string) {
		await mkdirp(dirname(filePath))
		await writeFile(filePath, data, { encoding: 'base64' })
	},
	async writeBuffer(filePath, data) {
		await mkdirp(dirname(filePath))
		await writeFile(filePath, data)
	},
}
