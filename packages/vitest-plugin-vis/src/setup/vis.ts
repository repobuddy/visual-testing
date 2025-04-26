import { commands } from '@vitest/browser/context'
import { createVis } from './create_vis.ts'
import { ctx } from './vis.ctx.ts'

/**
 * Visual test configuration on the client side.
 */
export const vis = createVis(commands)

export function vis2() {
	// const store = Object.create(null)
	ctx.beforeAll(async () => {
		await ctx.commands.setupVisSuite()
	})
}
