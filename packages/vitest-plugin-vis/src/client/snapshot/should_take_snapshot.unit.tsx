import { it } from 'vitest'
import { render } from 'vitest-browser-react'
import { shouldTakeSnapshot } from './should_take_snapshot.ts'

it('return falsy when no element in body', async ({ expect }) => {
	expect(shouldTakeSnapshot({ enable: true })).toBeFalsy()
})

it('returns falsy when meta is undefined', async ({ expect }) => {
	await render(<div>test</div>)
	expect(shouldTakeSnapshot(undefined)).toBeFalsy()
})

it('returns true when it is a rendering test with meta.enable=true', async ({ expect }) => {
	await render(<div>test</div>)
	expect(shouldTakeSnapshot({ enable: true })).toBe(true)
})
