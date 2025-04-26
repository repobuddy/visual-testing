import { describe, it } from 'vitest'
import type { VisOptions } from '../config/types.ts'
import { DIFF_DIR, RESULT_DIR, SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { createSuite, getSuiteId } from './suite.ts'
import type { VisProjectState } from './vis_server_context.types.ts'

describe(`${getSuiteId.name}`, () => {
	const mockState = {
		projectRoot: '/root/project',
	} as VisProjectState

	it('returns `testPath` as the suite id for a file in the project root', ({ expect }) => {
		const testPath = '/root/project/test.ts'
		const options: VisOptions = {}
		expect(getSuiteId(mockState, testPath, options)).toBe('test.ts')
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
			const result = getSuiteId(mockState, testPath, options)
			expect(result).toBe('code.spec.ts')
		})
	})
})

describe(`${createSuite.name}`, () => {
	it('creates suiteId', ({ expect }) => {
		const r = createSuite(
			{
				projectRoot: '/root/project',
			} as VisProjectState,
			'/root/project/src/code.spec.ts',
			{},
		)
		expect(r.suiteId).toBe('code.spec.ts')
	})

	it('create suite directories based on directory in state and suite id', ({ expect }) => {
		const { suiteId, suite } = createSuite(
			{
				projectRoot: '/root/project',
				snapshotBaselineDir: `/root/project/${SNAPSHOT_ROOT_DIR}/local`,
				snapshotResultDir: `/root/project/${SNAPSHOT_ROOT_DIR}/${RESULT_DIR}`,
				snapshotDiffDir: `/root/project/${SNAPSHOT_ROOT_DIR}/${DIFF_DIR}`,
			} as VisProjectState,
			'/root/project/src/code.spec.ts',
			{},
		)
		expect(suite.baselineDir).toBe(`/root/project/${SNAPSHOT_ROOT_DIR}/local/${suiteId}`)
		expect(suite.resultDir).toBe(`/root/project/${SNAPSHOT_ROOT_DIR}/${RESULT_DIR}/${suiteId}`)
		expect(suite.diffDir).toBe(`/root/project/${SNAPSHOT_ROOT_DIR}/${DIFF_DIR}/${suiteId}`)
	})
})
