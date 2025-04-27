import { describe, expect, it } from 'vitest'
import { ctx } from './vis.ctx.ts'
import { vis2 } from './vis2.ts'

describe('vis', () => {
	const { beforeAllListeners } = ctx.mock()

	it('invokes setupVisSuite during beforeAll', async () => {
		vis2()
		expect(ctx.beforeAll).toHaveBeenCalled()
		expect(beforeAllListeners).toHaveLength(1)
		await Promise.all(beforeAllListeners.map((fn) => fn({} as any)))
		expect(ctx.commands.setupVisSuite).toHaveBeenCalled()
	})
})
