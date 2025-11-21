import { describe, expect, it } from 'vitest'
import { vis } from '../config.ts'
import { stubSuite } from '../server/testing/stubSuite.ts'
import { getVisOption } from '../server/vis_options.ts'

it('set plugin name to vis', () => {
	expect(vis().name).toBe('vis')
})

describe('vis().config()', () => {
	it('should not specify browser name', () => {
		const config = vis().config({} as any)
		expect(config.test?.browser.name).toBeUndefined()
	})

	it('uses __default as project name when no name is provided', () => {
		const plugin = vis()

		const { userConfig, browserCommandContext } = stubSuite({
			test: { name: undefined as any },
		})

		plugin.config(userConfig)

		expect(getVisOption(browserCommandContext)).toBeDefined()
	})

	it('uses provided project name', () => {
		const plugin = vis()

		const { userConfig, browserCommandContext } = stubSuite(
			{
				test: { name: 'my-project' },
			},
			{
				project: {
					runner: {
						config: {
							name: 'my-project',
						},
					},
				},
			},
		)

		plugin.config(userConfig)

		expect(getVisOption(browserCommandContext)).toBeDefined()
	})
})
