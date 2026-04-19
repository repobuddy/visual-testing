import { storybookVis } from '#storybook-addon-vis/vitest-plugin'
import { describe, it } from 'vitest'
import { getVisOption, stubSuite } from 'vitest-plugin-vis/testing/node'
import { NAME } from '../shared/constants.ts'

describe(`${storybookVis.name}()`, () => {
	it('should return the default configuration when called without options', ({ expect }) => {
		const result = storybookVis()
		expect(result).toMatchObject({
			name: NAME,
		})
		const { userConfig, browserCommandContext } = stubSuite()
		const config = result.config(userConfig)
		expect(config.test.setupFiles).toMatchObject([])
		expect(getVisOption(browserCommandContext).shortenLongSnapshotPaths).toBeFalsy()
	})

	it('should return the default configuration when called with empty options', ({ expect }) => {
		const result = storybookVis({})
		expect(result).toMatchObject({
			name: NAME,
		})
		const { userConfig } = stubSuite()
		const config = result.config(userConfig)
		expect(config.test.setupFiles).toMatchObject([])
	})

	it('can set comparison method to pixel', ({ expect }) => {
		const result = storybookVis({ comparisonMethod: 'pixel', diffOptions: { threshold: 0.01 } })
		const { userConfig } = stubSuite()
		const config = result.config(userConfig)
		expect(config.test.setupFiles).toMatchObject([])
	})

	it('can set comparison method to ssim', ({ expect }) => {
		const result = storybookVis({ comparisonMethod: 'ssim', diffOptions: { ssim: 'fast' } })
		const { userConfig } = stubSuite()
		const config = result.config(userConfig)
		expect(config.test.setupFiles).toMatchObject([])
	})

	it('can enable shortenLongSnapshotPaths', ({ expect }) => {
		const result = storybookVis({ shortenLongSnapshotPaths: true })
		const { userConfig, browserCommandContext } = stubSuite()
		result.config(userConfig)
		expect(getVisOption(browserCommandContext)).toMatchObject({ shortenLongSnapshotPaths: true })
	})

	it('can disable shortenLongSnapshotPaths', ({ expect }) => {
		const result = storybookVis({ shortenLongSnapshotPaths: false })
		const { userConfig, browserCommandContext } = stubSuite()
		result.config(userConfig)
		expect(getVisOption(browserCommandContext)).toMatchObject({ shortenLongSnapshotPaths: false })
	})
})
