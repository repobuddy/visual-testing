import ci from 'is-ci'
import { relative, resolve } from 'pathe'
import { beforeEach, describe, it, vi } from 'vitest'
import type { VisOptions } from '../config/types.ts'
import { DIFF_DIR, RESULT_DIR, SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { createStubPartialBrowserCommandContext } from '../testing/stubBrowserCommandContext.ts'
import { stubUserConfig } from '../testing/stubUserConfig.ts'
import { setVisOption } from './vis_options.ts'
import { deps } from './vis_server_context.deps.ts'
import { createSuite, createVisServerContext, getSuiteId } from './vis_server_context.logic.ts'
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

describe(`${createVisServerContext.name}`, () => {
	const userConfig = stubUserConfig({
		test: {
			name: 'subject',
			browser: { name: 'chrome', provider: 'playwright' },
		},
	})
	const stubCommandContext = createStubPartialBrowserCommandContext({
		root: resolve(import.meta.dirname, '../..'),
		testPath: import.meta.filename,
	})

	beforeEach(() => {
		setVisOption(userConfig, undefined)
		deps.rimraf = vi.fn() as any
		deps.getSnapshotPlatform = vi.fn(() => 'local' as any)
	})

	describe('set up state', () => {
		it('set projectPath to suite.project.config.root', async ({ expect }) => {
			const visContext = createVisServerContext()
			const commandContext = stubCommandContext()
			await visContext.setupSuite(commandContext)
			const state = await visContext.__test__getState(commandContext)

			expect(state.projectRoot).toEqual(commandContext.project.config.root)
			expect(state.projectRoot).toMatch(/vitest-plugin-vis$/)
		})

		it('default snapshotRootDir to SNAPSHOT_ROOT_DIR', async ({ expect }) => {
			const visContext = createVisServerContext()
			const context = stubCommandContext()
			await visContext.setupSuite(context)
			const state = await visContext.__test__getState(context)

			expect(state.snapshotRootDir).toEqual(`${SNAPSHOT_ROOT_DIR}/${ci ? process.platform : 'local'}`)
		})

		it('honors the provided customizeSnapshotSubpath', async ({ expect }) => {
			const visContext = createVisServerContext()
			const browserContext = stubCommandContext()
			const suiteId = relative(browserContext.project.config.root, browserContext.testPath)

			const customizeSnapshotSubpath = (subPath: string) => subPath
			const userConfig = stubUserConfig({
				root: resolve(import.meta.dirname, '../..'),
				test: {
					name: 'subject',
					browser: { name: 'chrome', provider: 'playwright' },
				},
			})
			setVisOption(userConfig, { customizeSnapshotSubpath })

			await visContext.setupSuite(browserContext)

			const suiteInfo = await visContext.getSuiteInfo(browserContext, 'some-test.ts/testname')
			expect(suiteInfo.suiteId).toBe(suiteId)
		})
	})
})
