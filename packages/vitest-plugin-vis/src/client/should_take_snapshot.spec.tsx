import { afterEach, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { NAME } from '../shared/constants.ts'
import { ctx } from './ctx.ts'
import { shouldTakeSnapshot } from './should_take_snapshot.ts'

afterEach(() => ctx.__test__reset())

it('will get meta automatically if not provided', async ({ expect }) => {
	render(<div>test</div>)
	ctx.getCurrentTest = () => ({ meta: { [NAME]: { enable: true } } }) as any
	expect(shouldTakeSnapshot()).toBe(true)
})
