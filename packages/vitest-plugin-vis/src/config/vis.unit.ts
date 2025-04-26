import { afterEach, describe, expect, it } from 'vitest'
import { vis } from '../config.ts'
import { visServerContext } from '../server/vis_server_context.ts'

afterEach(() => visServerContext.__test__reset())

it('set plugin name to vis', () => {
	expect(vis().name).toBe('vis')
})

describe('vis().config()', () => {
	it('should not specify browser name', () => {
		const config = vis().config({})
		expect(config.test?.browser.name).toBeUndefined()
	})

	it('uses __default as project name when no name is provided', () => {
		vis().config({ test: {} })

		expect(visServerContext.__test__getOptions()).toBeDefined()
	})

	it('uses provided project name', () => {
		const plugin = vis()

		plugin.config({ test: { name: 'my-project' } })

		expect(visServerContext.__test__getOptions('my-project')).toBeDefined()
	})
})
