import { afterEach, describe, expect, it, vi } from 'vitest'
import { file } from './externals/file.ts'
import { createSnapshotWriter } from './snapshot_writer.ts'

describe('createSnapshotWriter', () => {
	const mkdirpMock = vi.fn()
	const writeFileMock = vi.fn()
	const snapshotWriter = createSnapshotWriter({
		...file,
		mkdirp: mkdirpMock,
		writeFile: writeFileMock,
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('writeBase64', () => {
		it('should create the directory and write the file with base64 encoding', async () => {
			const filePath = '/path/to/snapshot'
			const data = 'base64data'

			await snapshotWriter.writeBase64(filePath, data)

			expect(mkdirpMock).toHaveBeenCalledWith('/path/to')
			expect(writeFileMock).toHaveBeenCalledWith(filePath, data, { encoding: 'base64' })
		})
	})

	describe('writeBuffer', () => {
		it('should create the directory and write the file with a buffer', async () => {
			const filePath = '/path/to/snapshot'
			const data = Buffer.from('bufferdata')

			await snapshotWriter.writeBuffer(filePath, data)

			expect(mkdirpMock).toHaveBeenCalledWith('/path/to')
			expect(writeFileMock).toHaveBeenCalledWith(filePath, data)
		})
	})
})
