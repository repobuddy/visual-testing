import { describe, expect, it } from 'vitest'
import { vis } from '../config.ts'
import { getVisOption } from '../server/vis_options.ts'
import { stubSuite } from '../testing/stubSuite.ts'

it('set plugin name to vis', () => {
	expect(vis().name).toBe('vis')
})

describe('vis().config()', () => {
	it('should not specify browser name', () => {
		const config = vis().config({})
		expect(config.test?.browser.name).toBeUndefined()
	})

	it('uses __default as project name when no name is provided', () => {
		const plugin = vis()

		const { userConfig, browserCommandContext } = stubSuite({
			test: {},
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
					vite: {
						config: {
							test: { name: 'my-project' },
						},
					},
				},
			},
		)

		plugin.config(userConfig)

		expect(getVisOption(browserCommandContext)).toBeDefined()
	})
})
