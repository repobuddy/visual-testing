import { page } from '@vitest/browser/context'
import { afterEach, it } from 'vitest'
import { NAME } from '../shared/constants.ts'
import { ctx } from './ctx.ts'
import { shouldTakeSnapshot } from './should_take_snapshot.ts'

afterEach(() => ctx.__test__reset())

it('will get meta automatically if not provided', async ({ expect }) => {
	page.render(<div>test</div>)
	ctx.getCurrentTest = () => ({ meta: { [NAME]: { enable: true } } }) as any
	expect(shouldTakeSnapshot()).toBe(true)
})
