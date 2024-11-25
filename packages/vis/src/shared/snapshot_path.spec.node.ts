import { describe, expect, it } from 'vitest'
import { resolveSnapshotRootDir } from './snapshot_path.js'

describe('resolveSnapshotRootDir', () => {
	it('should return the provided snapshotRootDir if defined', () => {
		const result = resolveSnapshotRootDir({ snapshotRootDir: 'custom_dir' })
		expect(result).toBe('custom_dir')
	})

	it('should return "__vis__" if snapshotRootDir is undefined', () => {
		const result = resolveSnapshotRootDir({})
		expect(result).toBe('__vis__')
	})
	it('should return "__vis__" if options is undefined', () => {
		const result = resolveSnapshotRootDir(undefined)
		expect(result).toBe('__vis__')
	})
})
