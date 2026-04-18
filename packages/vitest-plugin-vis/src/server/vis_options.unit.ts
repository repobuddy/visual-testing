import { beforeEach, describe, expect, it } from 'vitest'
import { stubBrowserCommandContext } from './testing/stubBrowserCommandContext.ts'
import { clearVisOptionsRegistryForTesting, getVisOption, setVisOption } from './vis_options.ts'

describe(`${setVisOption.name}`, () => {
	beforeEach(() => {
		clearVisOptionsRegistryForTesting()
	})
	it('should create a project with the given name and root', () => {
		const name = 'test-project'

		setVisOption(
			{ test: { name } },

			{},
		)

		const project = getVisOption(
			stubBrowserCommandContext({
				project: {
					runner: {
						config: {
							name,
						},
					},
				},
			}),
		)
		expect(project).toEqual({})
	})

	it('merges __default options when project name differs', () => {
		setVisOption({}, { shortenLongSnapshotPaths: true, snapshotRootDir: 'snap' })

		const merged = getVisOption(
			stubBrowserCommandContext({
				project: {
					runner: {
						config: {
							name: 'browser-project',
						},
					},
				},
			}),
		)

		expect(merged).toMatchObject({ shortenLongSnapshotPaths: true, snapshotRootDir: 'snap' })
	})
})
