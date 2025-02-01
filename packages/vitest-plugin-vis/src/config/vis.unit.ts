import { afterEach, describe, it } from 'vitest'
import { vis } from '../config.ts'
import { visContext } from '../server/vis_context.ts'

afterEach(() => visContext.__test__reset())

it('plugin name', ({ expect }) => {
	expect(vis().name).toBe('vis')
})

describe('vis().config()', () => {
	it('do not specify browser name', ({ expect }) => {
		const config = vis().config()
		expect(config.test.browser.name).toBeUndefined()
	})
})
