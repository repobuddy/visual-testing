import { describe, expect, it } from 'vitest'
import { DIFF_OUTPUT_DIR, RESULT_DIR, SNAPSHOT_DIR } from '../shared/contants.js'
import type { VisOptions } from '../shared/types.js'
import type { VisState } from './types.js'
import { createSuite, getSuiteId } from './vis_context.logic.js'

describe(`${getSuiteId.name}()`, () => {
	const mockState = {
		projectPath: '/root/project',
	} as VisState

	it('returns `testPath` as the suite id for a file in the project root', () => {
		const testPath = '/root/project/test.js'
		const options: VisOptions = {}
		expect(getSuiteId(mockState, testPath, options)).toBe('test.js')
	})

	it('trims well known test folder form suite id', () => {
		const options: VisOptions = {}
		const testPaths = [
			'/root/project/tests/code.spec.js',
			'/root/project/test/code.spec.js',
			'/root/project/src/code.spec.js',
			'/root/project/source/code.spec.js',
			'/root/project/js/code.spec.js',
			'/root/project/ts/code.spec.js',
			'/root/project/lib/code.spec.js',
		]
		testPaths.forEach((testPath) => {
			const result = getSuiteId(mockState, testPath, options)
			expect(result).toBe('code.spec.js')
		})
	})
})

describe(`${createSuite.name}()`, () => {
	it('creates suiteId', () => {
		const r = createSuite(
			{
				projectPath: '/root/project',
			} as VisState,
			'/root/project/src/code.spec.js',
			{},
		)
		expect(r.suiteId).toBe('code.spec.js')
	})

	it('create suite directories based on directory in state and suite id', () => {
		const { suiteId, suite } = createSuite(
			{
				projectPath: '/root/project',
				snapshotBaselineDir: `/root/project/${SNAPSHOT_DIR}/local`,
				snapshotResultDir: `/root/project/${SNAPSHOT_DIR}/${RESULT_DIR}`,
				snapshotDiffDir: `/root/project/${SNAPSHOT_DIR}/${DIFF_OUTPUT_DIR}`,
			} as VisState,
			'/root/project/src/code.spec.js',
			{},
		)
		expect(suite.baselineDir).toBe(`/root/project/${SNAPSHOT_DIR}/local/${suiteId}`)
		expect(suite.resultDir).toBe(`/root/project/${SNAPSHOT_DIR}/${RESULT_DIR}/${suiteId}`)
		expect(suite.diffDir).toBe(`/root/project/${SNAPSHOT_DIR}/${DIFF_OUTPUT_DIR}/${suiteId}`)
	})
})
