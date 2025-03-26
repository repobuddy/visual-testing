import { page } from '@vitest/browser/context'
import { afterEach, it } from 'vitest'
import { ctx } from '../ctx.ts'

afterEach(() => ctx.__test__reset())

it('throws when not running in a test', async ({ expect }) => {
	ctx.getCurrentTest = () => undefined as any
	await expect(() => page.toMatchImageSnapshot()).rejects.toThrow('`toMatchImageSnapshot()` must be called in a test.')
})
