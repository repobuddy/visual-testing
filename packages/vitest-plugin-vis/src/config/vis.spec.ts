import { vis, type PixelComparisonOptions, type SsimComparisonOptions } from '#vitest-plugin-vis/config'
import { afterEach, expect, it } from 'vitest'
import { visServerContext } from '../server/vis_server_context.ts'

afterEach(() => visServerContext.__test__reset())

it('can be used with zero config', () => {
	expect(vis()).toBeDefined()
})

it('can customize snapshot root directory', () => {
	const plugin = vis({ snapshotRootDir: 'custom' })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toEqual({
		snapshotRootDir: 'custom',
	})
})

it('can customize snapshot subpath to keep base folder', () => {
	const customizeSnapshotSubpath = (subPath: string): string => subPath

	const plugin = vis({ customizeSnapshotSubpath })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		customizeSnapshotSubpath,
	})
})

it('can set default snapshot id', () => {
	const customizeSnapshotId = ({ id }: { id: string }) => id

	const plugin = vis({ customizeSnapshotId })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		customizeSnapshotId,
	})
})

it('can set default snapshot timeout', () => {
	const plugin = vis({ timeout: 1000 })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		timeout: 1000,
	})
})

it('can set default failure threshold', () => {
	const plugin = vis({ failureThreshold: 0.01 })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		failureThreshold: 0.01,
	})
})

it('can set default failure threshold type to percent', () => {
	const plugin = vis({ failureThresholdType: 'percent' })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		failureThresholdType: 'percent',
	})
})

it('can set default diff options', () => {
	const diffOptions = { threshold: 0.1 }

	const plugin = vis({ diffOptions })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
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

it('can set preset to none', () => {
	const plugin = vis({ preset: 'none' })

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

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject(options)
})

it('can set ssim options when comparison method is ssim', () => {
	const options: SsimComparisonOptions = {
		comparisonMethod: 'ssim',
		diffOptions: {
			ssim: 'bezkrovny',
		},
	}

	const plugin = vis(options)

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject(options)
})

it('can set the subject data test id', () => {
	const plugin = vis({ subjectDataTestId: 'test' })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		subjectDataTestId: 'test',
	})
})
