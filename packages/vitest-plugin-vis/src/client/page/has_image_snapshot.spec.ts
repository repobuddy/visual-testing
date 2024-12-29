import { page } from '@vitest/browser/context'
import { afterEach, expect, it } from 'vitest'
import { ctx } from './ctx.ts'

afterEach(() => ctx.__test__reset())

it('throws when not running in a test', async () => {
	ctx.getCurrentTest = () => undefined as any
	expect(() => page.hasImageSnapshot()).toThrow('`hasImageSnapshot()` must be called in a test.')
})
