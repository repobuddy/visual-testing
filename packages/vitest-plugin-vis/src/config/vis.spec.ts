import { vis, type PixelComparisonOptions, type SsimComparisonOptions } from '#vitest-plugin-vis/config'
import { expect, it } from 'vitest'
import { getVisOption } from '../server/vis_options.ts'
import { stubSuite } from '../testing/stubSuite.ts'

it('can be used with zero config', () => {
	expect(vis()).toBeDefined()
})

it('can customize snapshot root directory', () => {
	const plugin = vis({ snapshotRootDir: 'custom' })
	const { userConfig, browserCommandContext } = stubSuite()

	plugin.config(userConfig)

	expect(getVisOption(browserCommandContext)).toEqual({
		snapshotRootDir: 'custom',
	})
})

it('can customize snapshot subpath to keep base folder', () => {
	const snapshotSubpath = ({ subpath }: { subpath: string }): string => subpath

	const plugin = vis({ snapshotSubpath })

	const { userConfig, browserCommandContext } = stubSuite()

	plugin.config(userConfig)

	expect(getVisOption(browserCommandContext)).toMatchObject({
		snapshotSubpath,
	})
})

it('can change the default snapshot auto key with string', () => {
	const plugin = vis({ snapshotKey: 'custom' })

	const { userConfig, browserCommandContext } = stubSuite()

	plugin.config(userConfig)

	expect(getVisOption(browserCommandContext)).toMatchObject({
		snapshotKey: 'custom',
	})
})

it('reject snapshot key with dash', () => {
	const plugin = vis({ snapshotKey: 'invalid-key' })

	const { userConfig } = stubSuite()

	expect(() => plugin.config(userConfig)).toThrowError('Snapshot key cannot contain dash')
})

it('can set default snapshot timeout', () => {
	const plugin = vis({ timeout: 1000 })

	const { userConfig, browserCommandContext } = stubSuite()

	plugin.config(userConfig)

	expect(getVisOption(browserCommandContext)).toMatchObject({
		timeout: 1000,
	})
})

it('can set default failure threshold', () => {
	const plugin = vis({
		failureThreshold: 0.01,
	})

	const { userConfig, browserCommandContext } = stubSuite()

	plugin.config(userConfig)

	expect(getVisOption(browserCommandContext)).toMatchObject({
		failureThreshold: 0.01,
	})
})

it('can set default failure threshold type to percent', () => {
	const plugin = vis({ failureThresholdType: 'percent' })

	const { userConfig, browserCommandContext } = stubSuite()

	plugin.config(userConfig)

	expect(getVisOption(browserCommandContext)).toMatchObject({
		failureThresholdType: 'percent',
	})
})

it('can set default diff options', () => {
	const diffOptions = { threshold: 0.1 }

	const plugin = vis({ diffOptions })

	const { userConfig, browserCommandContext } = stubSuite()

	plugin.config(userConfig)

	expect(getVisOption(browserCommandContext)).toMatchObject({
		diffOptions,
	})
})

it('default preset is auto', () => {
	const plugin = vis()

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: ['vitest-plugin-vis/presets/auto'],
		},
	})
})

it('can set preset to manual', () => {
	const plugin = vis({ preset: 'manual' })

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: ['vitest-plugin-vis/presets/manual'],
		},
	})
})

it('can set preset to enable', () => {
	const plugin = vis({ preset: 'enable' })

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: ['vitest-plugin-vis/presets/enable'],
		},
	})
})

it('default to no preset when options is set', () => {
	const plugin = vis({})

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: [],
		},
	})
})

it('none gets no setup file', () => {
	const plugin = vis({ preset: 'none' })

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: [],
		},
	})
})

it('custom gets no setup file', () => {
	const plugin = vis({ preset: 'custom' })

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: [],
		},
	})
})

it('can set pixelmatch options when comparison method is pixel', () => {
	const options: PixelComparisonOptions = {
		comparisonMethod: 'pixel',
		diffOptions: {
			threshold: 0.1,
		},
	}
	const plugin = vis(options)

	const { userConfig, browserCommandContext } = stubSuite()

	plugin.config(userConfig)

	expect(getVisOption(browserCommandContext)).toMatchObject(options)
})

it('can set ssim options when comparison method is ssim', () => {
	const options: SsimComparisonOptions = {
		comparisonMethod: 'ssim',
		diffOptions: {
			ssim: 'bezkrovny',
		},
	}

	const plugin = vis(options)

	const { userConfig, browserCommandContext } = stubSuite()

	plugin.config(userConfig)

	expect(getVisOption(browserCommandContext)).toMatchObject(options)
})

it('can set the subject selector to data test id', () => {
	const plugin = vis({ subject: '[data-testid="test"]' })

	const { userConfig, browserCommandContext } = stubSuite()

	plugin.config(userConfig)

	expect(getVisOption(browserCommandContext)).toMatchObject({
		subject: '[data-testid="test"]',
	})
})
