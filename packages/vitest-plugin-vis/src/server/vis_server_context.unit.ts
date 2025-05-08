import ci from 'is-ci'
import { relative, resolve } from 'pathe'
import { beforeEach, describe, it, vi } from 'vitest'
import { SNAPSHOT_ROOT_DIR } from '../shared/constants.ts'
import { createStubPartialBrowserCommandContext } from '../testing/stubBrowserCommandContext.ts'
import { stubUserConfig } from '../testing/stubUserConfig.ts'
import { getSuite, setupSuite } from './suite.ts'
import { setVisOption } from './vis_options.ts'
import { deps } from './vis_server_context.deps.ts'
import { createVisServerContext } from './vis_server_context.logic.ts'

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

	describe(`${setupSuite.name}`, () => {
		it('set projectPath to suite.project.config.root', async ({ expect }) => {
			const commandContext = stubCommandContext()
			await setupSuite(commandContext)
			const state = await getSuite(commandContext)

			expect(state.projectRoot).toEqual(commandContext.project.config.root)
			expect(state.projectRoot).toMatch(/vitest-plugin-vis$/)
		})

		it('default snapshotRootDir to SNAPSHOT_ROOT_DIR', async ({ expect }) => {
			const context = stubCommandContext()
			await setupSuite(context)
			const state = await getSuite(context)

			expect(state.snapshotRootDir).toEqual(`${SNAPSHOT_ROOT_DIR}/${ci ? process.platform : 'local'}`)
		})

		it('honors the provided customizeSnapshotSubpath', async ({ expect }) => {
			const visContext = createVisServerContext()
			const browserContext = stubCommandContext()
			const suiteId = relative(browserContext.project.config.root, browserContext.testPath)

			const customizeSnapshotSubpath = ({ subpath }: { subpath: string }) => subpath
			const userConfig = stubUserConfig({
				root: resolve(import.meta.dirname, '../..'),
				test: {
					name: 'subject',
					browser: { name: 'chrome', provider: 'playwright' },
				},
			})
			setVisOption(userConfig, { snapshotSubpath: customizeSnapshotSubpath })

			await setupSuite(browserContext)

			const suiteInfo = await visContext.getSuiteInfo(browserContext, 'some-test.ts/testname')
			expect(suiteInfo.suiteId).toBe(suiteId)
		})
	})
})
