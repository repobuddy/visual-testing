import { page } from '@vitest/browser/context'
import { afterEach, it } from 'vitest'
import { ctx } from '../ctx.ts'

afterEach(() => ctx.__test__reset())

it('throws when not running in a test', async ({ expect }) => {
	ctx.getCurrentTest = () => undefined as any
	await expect(() => page.toMatchImageSnapshot()).rejects.toThrow('`toMatchImageSnapshot()` must be called in a test.')
})

it('throws an error when running in a concurrent test', ({ expect }) => {
	ctx.getCurrentTest = () => ({ concurrent: true }) as any
	expect(() => page.toMatchImageSnapshot()).rejects.toThrow(
		'`toMatchImageSnapshot()` cannot be called in a concurrent test because ' +
			"concurrent tests run at the same time in the same iframe and affect each other's environment.",
	)
})
