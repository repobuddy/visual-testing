import { afterEach, describe, expect, it } from 'vitest'
import { vis } from '../config.ts'
import { visContext } from '../server/vis_context.ts'

afterEach(() => visContext.__test__reset())

it('can be used with zero config', () => {
	expect(vis()).toBeDefined()
})

it('plugin name', () => {
	expect(vis().name).toBe('vis')
})

it('defines default config', () => {
	vis()
	expect(visContext.getOptions()).toEqual({
		snapshotRootDir: '__vis__',
	})
})

it('can customize snapshot root directory', () => {
	vis({ snapshotRootDir: 'custom' })
	expect(visContext.getOptions()).toEqual({
		snapshotRootDir: 'custom',
	})
})

it('can customize snapshot subpath to keep base folder', () => {
	const customizeSnapshotSubpath = (subPath: string): string => subPath

	vis({ customizeSnapshotSubpath })

	expect(visContext.getOptions()).toMatchObject({
		customizeSnapshotSubpath,
	})
})

it('can set default snapshot id', () => {
	const customizeSnapshotId = (id: string) => id

	vis({ customizeSnapshotId })

	expect(visContext.getOptions()).toMatchObject({
		customizeSnapshotId,
	})
})

it('can set default snapshot timeout', () => {
	vis({ snapshotTimeout: 1000 })
	expect(visContext.getOptions()).toMatchObject({
		snapshotTimeout: 1000,
	})
})

it('can set default failure threshold', () => {
	vis({ failureThreshold: 0.01 })
	expect(visContext.getOptions()).toMatchObject({
		failureThreshold: 0.01,
	})
})

it('can set default failure threshold type to percent', () => {
	vis({ failureThresholdType: 'percent' })
	expect(visContext.getOptions()).toMatchObject({
		failureThresholdType: 'percent',
	})
})

it('can set default diff options', () => {
	const diffOptions = { threshold: 0.1 }

	vis({ diffOptions })

	expect(visContext.getOptions()).toMatchObject({
		diffOptions,
	})
})

describe('vis().config()', () => {
	it('do not specify browser name', () => {
		const config = vis().config()
		expect(config.test.browser.name).toBeUndefined()
	})
})
