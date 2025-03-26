import { page } from '@vitest/browser/context'
import { afterEach, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { ctx } from '../ctx.ts'

afterEach(() => ctx.__test__reset())

it('throws when not running in a test', ({ expect }) => {
	ctx.getCurrentTest = () => undefined as any
	expect(() => page.toMatchImageSnapshot()).toThrow('`toMatchImageSnapshot()` must be called in a test.')
})

it('throws an error when running in a concurrent test', ({ expect }) => {
	ctx.getCurrentTest = () => ({ concurrent: true }) as any
	expect(() => page.toMatchImageSnapshot()).toThrow(
		'`toMatchImageSnapshot()` cannot be called in a concurrent test because ' +
			"concurrent tests run at the same time in the same iframe and affect each other's environment.",
	)
})

it.skip('takes an image snapshot', async () => {
	render(<div>hello world</div>)
	await page.toMatchImageSnapshot()

	await expect(page.hasImageSnapshot()).resolves.toBe(true)
})
