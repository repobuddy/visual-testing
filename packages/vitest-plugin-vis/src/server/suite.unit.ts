import { describe, expect, it } from 'vitest'
import type { VisOptions } from '../config/types.ts'
import { DIFF_DIR, RESULT_DIR, SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { stubSuite } from '../testing/stubSuite.js'
import { createModule, getSuiteId, getTaskSubpath } from './suite.ts'
import type { VisSuite } from './vis_server_context.types.ts'

describe(`${getTaskSubpath.name}`, () => {
	const mockState = {
		projectRoot: '/root/project',
	} as VisSuite

	it('returns `testPath` as the suite id for a file in the project root', ({ expect }) => {
		const testPath = '/root/project/test.ts'
		const options: VisOptions = {}
		expect(getTaskSubpath(mockState, testPath, options)).toBe('test.ts')
	})

	it('trims well known test folder form suite id', ({ expect }) => {
		const options: VisOptions = {}
		const testPaths = [
			'/root/project/tests/code.spec.ts',
			'/root/project/test/code.spec.ts',
			'/root/project/src/code.spec.ts',
			'/root/project/source/code.spec.ts',
			'/root/project/js/code.spec.ts',
			'/root/project/ts/code.spec.ts',
			'/root/project/lib/code.spec.ts',
		]
		testPaths.forEach((testPath) => {
			const result = getTaskSubpath(mockState, testPath, options)
			expect(result).toBe('code.spec.ts')
		})
	})
})

describe(`${createModule.name}`, () => {
	it('creates suiteId', ({ expect }) => {
		const r = createModule(
			{
				projectRoot: '/root/project',
			} as VisSuite,
			'/root/project/src/code.spec.ts',
			{},
		)
		expect(r.taskSubpath).toBe('code.spec.ts')
	})

	it('create suite directories based on directory in state and suite id', ({ expect }) => {
		const {
			taskSubpath: suiteId,
			baselineDir,
			diffDir,
			resultDir,
		} = createModule(
			{
				projectRoot: '/root/project',
				snapshotBaselineDir: `/root/project/${SNAPSHOT_ROOT_DIR}/local`,
				snapshotResultDir: `/root/project/${SNAPSHOT_ROOT_DIR}/${RESULT_DIR}`,
				snapshotDiffDir: `/root/project/${SNAPSHOT_ROOT_DIR}/${DIFF_DIR}`,
			} as VisSuite,
			'/root/project/src/code.spec.ts',
			{},
		)
		expect(baselineDir).toBe(`/root/project/${SNAPSHOT_ROOT_DIR}/local/${suiteId}`)
		expect(resultDir).toBe(`/root/project/${SNAPSHOT_ROOT_DIR}/${RESULT_DIR}/${suiteId}`)
		expect(diffDir).toBe(`/root/project/${SNAPSHOT_ROOT_DIR}/${DIFF_DIR}/${suiteId}`)
	})
})

describe(`${getSuiteId.name}`, () => {
	it('should return the correct project ID', () => {
		const { browserCommandContext } = stubSuite(
			{},
			{
				project: {
					config: {
						root: '/path/to/project',
						name: 'my-project',
					},
				},
			},
		)

		const result = getSuiteId(browserCommandContext)
		expect(result).toBe('undefined/my-project')
	})

	it('should handle empty root and name gracefully', () => {
		const { browserCommandContext } = stubSuite(
			{},
			{
				project: {
					config: {
						root: '',
						name: '',
					},
				},
			},
		)

		const result = getSuiteId(browserCommandContext)
		expect(result).toBe('undefined/')
	})

	it('should handle missing name property', () => {
		const { browserCommandContext } = stubSuite(
			{},
			{
				project: {
					config: {
						root: '/path/to/project',
						name: undefined as unknown as string,
					},
				},
			},
		)

		const result = getSuiteId(browserCommandContext)
		expect(result).toBe('undefined/undefined')
	})
})
