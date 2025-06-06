import { page } from '@vitest/browser/context'
import { afterEach, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { ctx } from '../ctx.ts'

afterEach(() => ctx.__test__reset())

it('throws when not running in a test', ({ expect }) => {
	ctx.getCurrentTest = () => undefined as any
	expect(() => page.hasImageSnapshot()).toThrow('`hasImageSnapshot()` must be called in a test.')
})

it('throws an error when running in a concurrent test', ({ expect }) => {
	ctx.getCurrentTest = () => ({ concurrent: true }) as any
	expect(() => page.hasImageSnapshot()).toThrow(
		'`hasImageSnapshot()` cannot be called in a concurrent test because ' +
			"concurrent tests run at the same time in the same iframe and affect each other's environment. ",
	)
})

it('rejects snapshot key with dash', ({ expect }) => {
	expect(() => page.hasImageSnapshot({ snapshotKey: 'invalid-key' })).toThrowError('Snapshot key cannot contain dash')
})

it('returns false when no snapshot exists', async ({ expect }) => {
	expect(
		await page.hasImageSnapshot({
			snapshotKey: 'non_existing_snapshot',
		}),
	).toBe(false)
})

it('returns true when the snapshot exists', async ({ expect }) => {
	render(<div data-testid="subject">hello</div>)
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot({
		snapshotKey: 'existing_snapshot',
	})
	expect(
		await page.hasImageSnapshot({
			snapshotKey: 'existing_snapshot',
		}),
	).toBe(true)
})
