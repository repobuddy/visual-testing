import { ctx } from './vis.ctx.ts'

export function vis2() {
	// const store = Object.create(null)
	ctx.beforeAll(async () => {
		await ctx.commands.setupVisSuite()
	})
}
