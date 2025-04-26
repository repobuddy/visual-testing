import { afterEach, describe, it } from 'vitest'
import { vis } from '../config.ts'
import { visServerContext } from '../server/vis_server_context.ts'

afterEach(() => visServerContext.__test__reset())

it('set plugin name to vis', ({ expect }) => {
	expect(vis().name).toBe('vis')
})

describe('vis().config()', () => {
	it('should not specify browser name', ({ expect }) => {
		const config = vis().config({ test: { name: 'proj' } })
		expect(config.test?.browser.name).toBeUndefined()
	})
})
