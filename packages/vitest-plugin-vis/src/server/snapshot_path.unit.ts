import ci from 'is-ci'
import { resolve } from 'pathe'
import { describe, it } from 'vitest'
import type { VisOptions } from '../config/types.ts'
import { createStubPartialBrowserCommandContext } from '../testing/stubBrowserCommandContext.ts'
import { getSnapshotSubpath, resolveSnapshotRootDir } from './snapshot_path.ts'

const stubContext = createStubPartialBrowserCommandContext({
	root: resolve(import.meta.dirname, '../..'),
	testPath: import.meta.filename,
})

describe(`${resolveSnapshotRootDir.name}()`, () => {
	it('should return "__vis__/..." if snapshotRootDir is undefined', ({ expect }) => {
		const result = resolveSnapshotRootDir(stubContext(), {})
		expect(result).toBe(`__vis__/${ci ? process.platform : 'local'}`)
	})
	it('should return "__vis__/..." if options is undefined', ({ expect }) => {
		const result = resolveSnapshotRootDir(stubContext(), {})
		expect(result).toBe(`__vis__/${ci ? process.platform : 'local'}`)
	})

	it('should return the provided snapshotRootDir if defined', ({ expect }) => {
		const result = resolveSnapshotRootDir(stubContext(), { snapshotRootDir: 'custom_dir' })
		expect(result).toBe(`custom_dir/${ci ? process.platform : 'local'}`)
	})

	it('should use function to customize snapshotRootDir', ({ expect }) => {
		const result = resolveSnapshotRootDir(
			stubContext({
				provider: {
					name: 'webdriverio',
					browserName: 'chrome',
				},
			}),
			{
				snapshotRootDir({ browserName, providerName, platform }) {
					return `custom_${browserName}_${providerName}_${platform}`
				},
			},
		)
		expect(result).toBe(`custom_chrome_webdriverio_${process.platform}`)
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
