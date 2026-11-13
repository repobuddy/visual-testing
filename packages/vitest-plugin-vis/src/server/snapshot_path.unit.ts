import { platform } from 'node:process'
import ci from 'is-ci'
import { resolve } from 'pathe'
import { describe, expect, it, vi } from 'vitest'
import type { VisOptions } from '../config/types.ts'
import { getSnapshotSubpath, resolveSnapshotRootDir, resolveSnapshotRootDirOption } from './snapshot_path.ts'
import { createStubPartialBrowserCommandContext } from './testing/stubBrowserCommandContext.ts'
import { stubSuite } from './testing/stubSuite.ts'

vi.mock('is-ci', () => ({
	default: true, // Mocking `is-ci` as true
}))
vi.mock('node:process', () => ({
	platform: 'linux', // Mocking process.platform as 'linux'
}))

const stubContext = createStubPartialBrowserCommandContext({
	root: resolve(import.meta.dirname, '../..'),
	testPath: import.meta.filename,
})

describe(`${resolveSnapshotRootDir.name}()`, () => {
	it('should return "__vis__/..." if snapshotRootDir is undefined', ({ expect }) => {
		const result = resolveSnapshotRootDir(stubContext(), {})
		expect(result).toBe(`__vis__/${ci ? platform : 'local'}`)
	})
	it('should return "__vis__/..." if options is undefined', ({ expect }) => {
		const result = resolveSnapshotRootDir(stubContext(), {})
		expect(result).toBe(`__vis__/${ci ? platform : 'local'}`)
	})

	it('should return the provided snapshotRootDir if defined', ({ expect }) => {
		const result = resolveSnapshotRootDir(stubContext(), { snapshotRootDir: 'custom_dir' })
		expect(result).toBe(`custom_dir/${ci ? platform : 'local'}`)
	})

	it('should use function to customize snapshotRootDir', ({ expect }) => {
		const result = resolveSnapshotRootDir(
			stubContext({
				provider: {
					name: 'webdriverio',
				},
				project: {
					browser: {
						config: {
							browser: {
								name: 'chrome',
							},
						},
					},
				},
			}),
			{
				snapshotRootDir({ browserName, providerName, platform }) {
					return `custom_${browserName}_${providerName}_${platform}`
				},
			},
		)
		expect(result).toBe(`custom_chrome_webdriverio_${platform}`)
	})

	it('passes the documented context fields to the snapshotRootDir function', ({ expect }) => {
		let received: unknown
		resolveSnapshotRootDir(
			stubContext({
				provider: { name: 'playwright' },
				project: {
					browser: {
						config: {
							browser: { name: 'chromium', screenshotFailures: false, screenshotDirectory: '__shots__' },
						},
					},
				},
			}),
			{
				snapshotRootDir(context) {
					received = context
					return 'x'
				},
			},
		)
		expect(received).toMatchObject({
			ci: true,
			platform: 'linux',
			providerName: 'playwright',
			browserName: 'chromium',
			screenshotFailures: false,
			screenshotDirectory: '__shots__',
			rootDir: '__vis__',
		})
	})

	describe('when in CI', () => {
		it('should use process.platform', () => {
			const { browserCommandContext } = stubSuite()

			const result = resolveSnapshotRootDir(browserCommandContext as any, {})
			expect(result).toBe('__vis__/linux')
		})
	})
})

describe(`${resolveSnapshotRootDirOption.name}()`, () => {
	it('returns `__vis__/<platform>` when the option is not set', ({ expect }) => {
		expect(resolveSnapshotRootDirOption(undefined, () => ({}))).toBe('__vis__/linux')
	})

	it('adds the platform folder to a string', ({ expect }) => {
		expect(resolveSnapshotRootDirOption('__vis__', () => ({}))).toBe('__vis__/linux')
	})

	it('returns the result of a function as is, with the context it creates', ({ expect }) => {
		const getContext = vi.fn(() => ({ projectName: 'HD' }))
		expect(resolveSnapshotRootDirOption(({ projectName }) => `snapshots/${projectName}`, getContext)).toBe(
			'snapshots/HD',
		)
		expect(getContext).toHaveBeenCalledOnce()
	})

	it('does not create the context when the option is not a function', ({ expect }) => {
		const getContext = vi.fn(() => ({}))
		resolveSnapshotRootDirOption('__vis__', getContext)
		resolveSnapshotRootDirOption(undefined, getContext)
		expect(getContext).not.toHaveBeenCalled()
	})

	it('gives the same folder as `resolveSnapshotRootDir()` for the same option', ({ expect }) => {
		for (const snapshotRootDir of [undefined, '__vis__', 'custom_dir']) {
			expect(resolveSnapshotRootDirOption(snapshotRootDir, () => ({}))).toBe(
				resolveSnapshotRootDir(stubContext(), { snapshotRootDir }),
			)
		}
	})
})

describe(`${getSnapshotSubpath.name}()`, () => {
	it('removes a leading `./`, so a Storybook import path gives the same subpath as the test file path', ({
		expect,
	}) => {
		const received: string[] = []
		const options: VisOptions = {
			snapshotSubpath: ({ subpath }) => {
				received.push(subpath)
				return subpath
			},
		}
		expect(getSnapshotSubpath('./src/button.stories.tsx', options)).toBe('src/button.stories.tsx')
		expect(getSnapshotSubpath('src/button.stories.tsx', options)).toBe('src/button.stories.tsx')
		expect(received).toEqual(['src/button.stories.tsx', 'src/button.stories.tsx'])
		expect(getSnapshotSubpath('./src/button.stories.tsx', {})).toBe('button.stories.tsx')
	})

	it('should use defaultSnapshotSubpath when snapshotSubpath is not provided', ({ expect }) => {
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

	it('should use snapshotSubpath when provided', ({ expect }) => {
		const suiteName = 'tests/myTestSuite'
		const options: VisOptions = {
			snapshotSubpath: ({ subpath }) => subpath,
		}
		const result = getSnapshotSubpath(suiteName, options)
		expect(result).toBe('tests/myTestSuite')
	})

	it('can use a custom trim function as snapshotSubpath', ({ expect }) => {
		const customFolders = ['app', 'pages', 'components']
		const options: VisOptions = {
			snapshotSubpath: ({ subpath }) => {
				const dir = subpath.split('/', 1)[0]!
				return customFolders.includes(dir) ? subpath.slice(dir.length + 1) : subpath
			},
		}
		expect(getSnapshotSubpath('app/button.spec.ts', options)).toBe('button.spec.ts')
		expect(getSnapshotSubpath('src/button.spec.ts', options)).toBe('src/button.spec.ts')
	})

	it('should handle suiteName with special directories', ({ expect }) => {
		const suiteName = 'src/myTestSuite'
		const options: VisOptions = {}
		const result = getSnapshotSubpath(suiteName, options)
		expect(result).toBe('myTestSuite')
	})
})
