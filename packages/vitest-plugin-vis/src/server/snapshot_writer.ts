import { dirname } from 'pathe'
import { file } from './externals/file.ts'

export interface SnapshotWriter {
	writeBase64(filePath: string, data: string): Promise<void>
	writeBuffer(filePath: string, data: Buffer): Promise<void>
}

export function createSnapshotWriter({ mkdirp, writeFile } = file): SnapshotWriter {
	return {
		async writeBase64(filePath: string, data: string) {
			await mkdirp(dirname(filePath))
			await writeFile(filePath, data, { encoding: 'base64' })
		},
		async writeBuffer(filePath, data) {
			await mkdirp(dirname(filePath))
			await writeFile(filePath, data)
		},
	}
}

export const snapshotWriter = createSnapshotWriter()
