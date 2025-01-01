import { describe, expect, it } from 'vitest'
import { NAME } from '../shared/contants.ts'
import { storybookVis } from '../vitest-plugin.ts'

describe(`${storybookVis.name}()`, () => {
	it('should return the default configuration when called without options', () => {
		const result = storybookVis()
		expect(result).toMatchObject({
			name: NAME,
		})
		const config = result.config()
		expect(config.test.setupFiles).toBeUndefined()
	})

	it('should return the default configuration when called with empty options', () => {
		const result = storybookVis({})
		expect(result).toMatchObject({
			name: NAME,
		})
		const config = result.config()
		expect(config.test.setupFiles).toBeUndefined()
	})
})
