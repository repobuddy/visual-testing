import * as fs from 'node:fs/promises'
import { stat } from 'node:fs/promises'
import { describe, expect, it, vi } from 'vitest'
import { file } from './file.ts'

vi.mock('node:fs/promises', () => ({
	readFile: vi.fn(),
	writeFile: vi.fn(),
	stat: vi.fn(),
}))

describe(`${file.tryReadFile.name}()`, () => {
	it('returns base64 encoded content when file exists', async ({ expect }) => {
		const mockContent = 'test content'
		const mockBase64 = Buffer.from(mockContent).toString('base64')
		vi.mocked(fs.readFile).mockResolvedValue(mockBase64)

		const result = (await file.tryReadFile('existing-file.txt'))?.toString()
		expect(result).toBe(mockBase64)
		expect(fs.readFile).toHaveBeenCalledWith('existing-file.txt')
	})

	it('returns undefined when file does not exist', async ({ expect }) => {
		vi.mocked(fs.readFile).mockRejectedValue(new Error('File not found'))

		const result = (await file.tryReadFile('non-existent-file.txt'))?.toString()
		expect(result).toBeUndefined()
		expect(fs.readFile).toHaveBeenCalledWith('non-existent-file.txt')
	})

	it('returns undefined for any file system error', async ({ expect }) => {
		vi.mocked(fs.readFile).mockRejectedValue(new Error('Permission denied'))

		const result = (await file.tryReadFile('inaccessible-file.txt'))?.toString()
		expect(result).toBeUndefined()
		expect(fs.readFile).toHaveBeenCalledWith('inaccessible-file.txt')
	})

	it('handles empty files correctly', async ({ expect }) => {
		vi.mocked(fs.readFile).mockResolvedValue('')

		const result = (await file.tryReadFile('empty-file.txt'))?.toString()
		expect(result).toBe('')
		expect(fs.readFile).toHaveBeenCalledWith('empty-file.txt')
	})
})

describe('file.existFile', () => {
	it('should return true if the file exists and is a file', async () => {
		vi.mocked(stat).mockResolvedValueOnce({
			isFile: () => true,
		} as any)

		const result = await file.existFile('path/to/existing/file')
		expect(result).toBe(true)
		expect(stat).toHaveBeenCalledWith('path/to/existing/file')
	})

	it('should return false if the file exists but is not a file', async () => {
		vi.mocked(stat).mockResolvedValueOnce({
			isFile: () => false,
		} as any)

		const result = await file.existFile('path/to/existing/not-a-file')
		expect(result).toBe(false)
		expect(stat).toHaveBeenCalledWith('path/to/existing/not-a-file')
	})

	it('should return false if the file does not exist', async () => {
		vi.mocked(stat).mockRejectedValueOnce(new Error('File not found'))

		const result = await file.existFile('path/to/nonexistent/file')
		expect(result).toBe(false)
		expect(stat).toHaveBeenCalledWith('path/to/nonexistent/file')
	})
})
