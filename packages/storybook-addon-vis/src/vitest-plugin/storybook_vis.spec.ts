import { describe, it } from 'vitest'
import { NAME } from '../shared/contants.ts'
import { storybookVis } from '../vitest-plugin.ts'

describe(`${storybookVis.name}()`, () => {
	it('should return the default configuration when called without options', ({ expect }) => {
		const result = storybookVis()
		expect(result).toMatchObject({
			name: NAME,
		})
		const config = result.config()
		expect(config.test.setupFiles).toMatchObject([])
	})

	it('should return the default configuration when called with empty options', ({ expect }) => {
		const result = storybookVis({})
		expect(result).toMatchObject({
			name: NAME,
		})
		const config = result.config()
		expect(config.test.setupFiles).toMatchObject([])
	})

	it('can set comparison method to pixel', ({ expect }) => {
		const result = storybookVis({ comparisonMethod: 'pixel', diffOptions: { threshold: 0.01 } })
		const config = result.config()
		expect(config.test.setupFiles).toMatchObject([])
	})

	it('can set comparison method to ssim', ({ expect }) => {
		const result = storybookVis({ comparisonMethod: 'ssim', diffOptions: { ssim: 'fast' } })
		const config = result.config()
		expect(config.test.setupFiles).toMatchObject([])
	})
})
