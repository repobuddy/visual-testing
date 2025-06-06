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

it('rejects snapshot key with dash', async ({ expect }) => {
	await expect(() => page.toMatchImageSnapshot({ snapshotKey: 'invalid-key' })).rejects.toThrowError(
		'Snapshot key cannot contain dash',
	)
})

it('takes an image snapshot', async () => {
	render(<div style={{ height: '1000px', backgroundColor: 'greenyellow' }}>hello world</div>)
	await page.toMatchImageSnapshot({
		snapshotKey: 'test_snapshot',
	})

	await expect(
		page.hasImageSnapshot({
			snapshotKey: 'test_snapshot',
		}),
	).resolves.toBe(true)
})

it('supports full page image snapshot', async () => {
	render(<div style={{ height: '1000px', backgroundColor: 'greenyellow' }}>hello world</div>)
	await page.toMatchImageSnapshot({
		fullPage: true,
		snapshotKey: 'test_snapshot',
	})
	await expect(
		page.hasImageSnapshot({
			snapshotKey: 'test_snapshot',
		}),
	).resolves.toBe(true)
})
