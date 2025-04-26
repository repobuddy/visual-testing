import type { Options } from 'ssim.js'
import { afterEach, it } from 'vitest'
import { vis } from '../config.ts'
import { visServerContext } from '../server/vis_server_context.ts'

afterEach(() => visServerContext.__test__reset())

it('can be used with zero config', ({ expect }) => {
	expect(vis()).toBeDefined()
})

it('can customize snapshot root directory', ({ expect }) => {
	const plugin = vis({ snapshotRootDir: 'custom' })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toEqual({
		snapshotRootDir: 'custom',
	})
})

it('can customize snapshot subpath to keep base folder', ({ expect }) => {
	const customizeSnapshotSubpath = (subPath: string): string => subPath

	const plugin = vis({ customizeSnapshotSubpath })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		customizeSnapshotSubpath,
	})
})

it('can set default snapshot id', ({ expect }) => {
	const customizeSnapshotId = ({ id }: { id: string }) => id

	const plugin = vis({ customizeSnapshotId })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		customizeSnapshotId,
	})
})

it('can set default snapshot timeout', ({ expect }) => {
	const plugin = vis({ timeout: 1000 })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		timeout: 1000,
	})
})

it('can set default failure threshold', ({ expect }) => {
	const plugin = vis({ failureThreshold: 0.01 })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		failureThreshold: 0.01,
	})
})

it('can set default failure threshold type to percent', ({ expect }) => {
	const plugin = vis({ failureThresholdType: 'percent' })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		failureThresholdType: 'percent',
	})
})

it('can set default diff options', ({ expect }) => {
	const diffOptions = { threshold: 0.1 }

	const plugin = vis({ diffOptions })

	plugin.config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		diffOptions,
	})
})

it('default preset is auto', ({ expect }) => {
	const plugin = vis()

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: ['vitest-plugin-vis/presets/auto'],
		},
	})
})

it('can set preset to manual', ({ expect }) => {
	const plugin = vis({ preset: 'manual' })

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: ['vitest-plugin-vis/presets/manual'],
		},
	})
})

it('can set preset to enable', ({ expect }) => {
	const plugin = vis({ preset: 'enable' })

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: ['vitest-plugin-vis/presets/enable'],
		},
	})
})

it('default to no preset when options is set', ({ expect }) => {
	const plugin = vis({})

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: [],
		},
	})
})

it('can set preset to none', ({ expect }) => {
	const plugin = vis({ preset: 'none' })

	expect(plugin.config({})).toMatchObject({
		test: {
			setupFiles: [],
		},
	})
})

it('can set pixelmatch options when comparison method is pixel', ({ expect }) => {
	const diffOptions = { threshold: 0.1 }

	vis({ comparisonMethod: 'pixel', diffOptions }).config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		comparisonMethod: 'pixel',
		diffOptions,
	})
})

it('can set ssim options when comparison method is ssim', ({ expect }) => {
	const diffOptions: Partial<Options> = { ssim: 'bezkrovny' }

	vis({ comparisonMethod: 'ssim', diffOptions }).config({})

	expect(visServerContext.__test__getOptions()).toMatchObject({
		comparisonMethod: 'ssim',
		diffOptions,
	})
})

it('can set the subject data test id', ({ expect }) => {
	vis({ subjectDataTestId: 'test' }).config({})
	expect(visServerContext.__test__getOptions()).toMatchObject({
		subjectDataTestId: 'test',
	})
})
