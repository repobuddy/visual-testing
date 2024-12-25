import { afterEach, describe, expect, it } from 'vitest'
import { vis } from '../config.ts'
import { visContext } from '../server/vis_context.ts'

afterEach(() => visContext.__test__reset())

it('can be used with zero config', () => {
	expect(vis()).toBeDefined()
})

it('plugin name', () => {
	expect(vis().name).toBe('vis')
})

it('defines default config', () => {
	vis()
	expect(visContext.getOptions()).toEqual({
		snapshotRootDir: '__vis__',
	})
})

describe('vis().config()', () => {
	it('do not specify browser name', () => {
		const config = vis().config()
		expect(config.test.browser.name).toBeUndefined()
	})
})
