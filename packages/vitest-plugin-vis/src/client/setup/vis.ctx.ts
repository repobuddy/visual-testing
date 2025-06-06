import { commands } from '@vitest/browser/context'
import { afterEach, beforeAll, beforeEach, vi, type Awaitable, type Suite } from 'vitest'

export const ctx = {
	beforeAll,
	beforeEach,
	afterEach,
	commands,
	mock() {
		const beforeAllListeners: Array<(suite: Readonly<Suite | File>) => Awaitable<unknown>> = []
		beforeEach(() => {
			ctx.beforeAll = vi.fn((fn) => {
				beforeAllListeners.push(fn)
			})
			ctx.beforeEach = vi.fn()
			ctx.afterEach = vi.fn()
			ctx.commands = {
				setupVisSuite: vi.fn(),
			} as any
		})
		afterEach(() => {
			ctx.reset()
		})
		return {
			beforeAllListeners,
		}
	},
	reset() {
		ctx.beforeAll = beforeAll
		ctx.beforeEach = beforeEach
		ctx.afterEach = afterEach
	},
}
