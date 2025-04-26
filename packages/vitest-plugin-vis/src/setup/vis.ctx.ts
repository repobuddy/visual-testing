import { commands } from '@vitest/browser/context'
import { afterEach, beforeAll, beforeEach } from 'vitest'

export const ctx = {
	beforeAll,
	beforeEach,
	afterEach,
	commands,
	reset() {
		ctx.beforeAll = beforeAll
		ctx.beforeEach = beforeEach
		ctx.afterEach = afterEach
	},
}
