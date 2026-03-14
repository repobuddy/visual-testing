import { expect, it } from 'vitest'

it('should have toMatchImageSnapshot', () => {
	expect(expect('abc').toMatchImageSnapshot).toBeTypeOf('function')
})
