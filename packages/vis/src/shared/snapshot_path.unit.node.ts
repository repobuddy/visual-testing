import { describe, expect, it } from 'vitest'
import { getSnapshotSubpath, resolveSnapshotRootDir } from './snapshot_path.js'
import type { VisOptions } from './types.js'

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
		9
		const result = resolveSnapshotRootDir(undefined)
		expect(result).toBe('__vis__')
	})
})

describe('getSnapshotSubpath', () => {
	it('should use defaultCustomizeSnapshotSubpath when customizeSnapshotSubpath is not provided', () => {
		const suiteName = 'tests/myTestSuite'
		const options: VisOptions = {}
		const result = getSnapshotSubpath(suiteName, options)
		expect(result).toBe('myTestSuite')
	})

	it('should use customizeSnapshotSubpath when provided', () => {
		const suiteName = 'tests/myTestSuite'
		const options: VisOptions = {
			customizeSnapshotSubpath: (name) => name,
		}
		const result = getSnapshotSubpath(suiteName, options)
		expect(result).toBe('tests/myTestSuite')
	})

	it('should handle suiteName with special directories', () => {
		const suiteName = 'src/myTestSuite'
		const options: VisOptions = {}
		const result = getSnapshotSubpath(suiteName, options)
		expect(result).toBe('myTestSuite')
	})
})
