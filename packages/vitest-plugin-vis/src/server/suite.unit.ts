import { describe, expect, it } from 'vitest'
import type { VisOptions } from '../config/types.ts'
import { BASELINE_DIR, DIFF_DIR, RESULT_DIR, SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { createModule, getSuiteId, getTaskSubpath } from './suite.ts'
import { stubSuite } from './testing/stubSuite.ts'
import type { VisSuite } from './vis_server_context.types.ts'

describe(`${getTaskSubpath.name}`, () => {
	const mockState = {
		projectRoot: '/root/project',
		snapshotBaselineDir: `${SNAPSHOT_ROOT_DIR}/local/${BASELINE_DIR}`,
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

	it('condenses subpath when shortenLongSnapshotPaths and path would exceed limit', ({ expect }) => {
		const longRoot = `/r/${'x'.repeat(280)}`
		const state = {
			projectRoot: longRoot,
			snapshotBaselineDir: `${SNAPSHOT_ROOT_DIR}/local/${BASELINE_DIR}`,
		} as VisSuite
		const options: VisOptions = {
			shortenLongSnapshotPaths: true,
			snapshotSubpath: () => `${'d'.repeat(120)}/file.spec.tsx`,
		}
		const out = getTaskSubpath(state, `${longRoot}/src/t.spec.ts`, options)
		const dirPrefix = `${'d'.repeat(120)}/`
		expect(out.startsWith(dirPrefix)).toBe(true)
		expect(out).toMatch(new RegExp(`^${'d'.repeat(120)}/file-[a-f0-9]{12}\\.tsx$`))
	})
})

describe(`${createModule.name}`, () => {
	const relBaseline = `${SNAPSHOT_ROOT_DIR}/local/${BASELINE_DIR}`

	it('creates suiteId', ({ expect }) => {
		const r = createModule(
			{
				projectRoot: '/root/project',
				snapshotBaselineDir: relBaseline,
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
				snapshotBaselineDir: relBaseline,
				snapshotResultDir: `${SNAPSHOT_ROOT_DIR}/local/${RESULT_DIR}`,
				snapshotDiffDir: `${SNAPSHOT_ROOT_DIR}/local/${DIFF_DIR}`,
			} as VisSuite,
			'/root/project/src/code.spec.ts',
			{},
		)
		expect(baselineDir).toBe(`${relBaseline}/${suiteId}`)
		expect(resultDir).toBe(`${SNAPSHOT_ROOT_DIR}/local/${RESULT_DIR}/${suiteId}`)
		expect(diffDir).toBe(`${SNAPSHOT_ROOT_DIR}/local/${DIFF_DIR}/${suiteId}`)
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
