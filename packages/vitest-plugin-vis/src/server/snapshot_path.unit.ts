import { describe, it } from 'vitest'
import type { VisOptions } from '../config/types.ts'
import { getSnapshotSubpath, resolveSnapshotRootDir } from './snapshot_path.ts'

describe(`${resolveSnapshotRootDir.name}()`, () => {
	it('should return the provided snapshotRootDir if defined', ({ expect }) => {
		const result = resolveSnapshotRootDir({ snapshotRootDir: 'custom_dir' })
		expect(result).toBe('custom_dir')
	})

	it('should return "__vis__" if snapshotRootDir is undefined', ({ expect }) => {
		const result = resolveSnapshotRootDir({})
		expect(result).toBe('__vis__')
	})
	it('should return "__vis__" if options is undefined', ({ expect }) => {
		const result = resolveSnapshotRootDir(undefined)
		expect(result).toBe('__vis__')
	})
})

describe(`${getSnapshotSubpath.name}()`, () => {
	it('should use defaultCustomizeSnapshotSubpath when customizeSnapshotSubpath is not provided', ({ expect }) => {
		const options: VisOptions = {}
		const suiteNames = [
			'tests/myTestSuite',
			'test/myTestSuite',
			'src/myTestSuite',
			'source/myTestSuite',
			'js/myTestSuite',
			'ts/myTestSuite',
			'lib/myTestSuite',
		]
		suiteNames.forEach((suiteName) => {
			const result = getSnapshotSubpath(suiteName, options)
			expect(result).toBe('myTestSuite')
		})

		const result = getSnapshotSubpath('a/b', options)
		expect(result).toBe('a/b')
	})

	it('should use customizeSnapshotSubpath when provided', ({ expect }) => {
		const suiteName = 'tests/myTestSuite'
		const options: VisOptions = {
			customizeSnapshotSubpath: (name) => name,
		}
		const result = getSnapshotSubpath(suiteName, options)
		expect(result).toBe('tests/myTestSuite')
	})

	it('should handle suiteName with special directories', ({ expect }) => {
		const suiteName = 'src/myTestSuite'
		const options: VisOptions = {}
		const result = getSnapshotSubpath(suiteName, options)
		expect(result).toBe('myTestSuite')
	})
})
