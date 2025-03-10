import { afterEach, it } from 'vitest'
import { hasImageSnapshot } from '../index.ts'
import { ctx } from './ctx.ts'

afterEach(() => ctx.__test__reset())

it('returns false when not running in test', ({ expect }) => {
	ctx.getCurrentTest = () => undefined
	expect(hasImageSnapshot()).toBe(false)
})
