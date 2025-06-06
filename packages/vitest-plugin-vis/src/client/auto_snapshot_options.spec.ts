import { beforeAll, beforeEach, describe, it } from 'vitest'
import { setAutoSnapshotOptions } from '../client-api.ts'
import { NAME } from '../shared/constants.ts'
import { extractAutoSnapshotOptions } from './auto_snapshot_options.ts'

beforeAll(() => {
	// this set the `file` meta
	setAutoSnapshotOptions({ diffOptions: { threshold: 0.01 } })
})

beforeEach(() => {
	// this set the `task` meta
	setAutoSnapshotOptions({ failureThreshold: 0.01 })
})

it('should merge meta from beforeAll and beforeEach', ({ expect, task }) => {
	const meta = extractAutoSnapshotOptions(task)
	expect(meta).toEqual({ enable: true, diffOptions: { threshold: 0.01 }, failureThreshold: 0.01 })
})

it('can disable at task level', ({ expect, task }) => {
	setAutoSnapshotOptions({ enable: false })
	expect(extractAutoSnapshotOptions(task)).toEqual({
		enable: false,
		diffOptions: { threshold: 0.01 },
		failureThreshold: 0.01,
	})
})

it('can set comparison method to ssim', ({ expect, task }) => {
	setAutoSnapshotOptions({
		comparisonMethod: 'ssim',
		diffOptions: { ssim: 'fast' },
	})
	expect(extractAutoSnapshotOptions(task)).toEqual({
		enable: true,
		comparisonMethod: 'ssim',
		diffOptions: { ssim: 'fast' },
		failureThreshold: 0.01,
	})
})

it('can set subject', ({ expect, task }) => {
	setAutoSnapshotOptions({ subject: 'subject' })
	expect(extractAutoSnapshotOptions(task)).toEqual({
		enable: true,
		diffOptions: { threshold: 0.01 },
		failureThreshold: 0.01,
		subject: 'subject',
	})
})

describe('without beforeAll', () => {
	beforeAll((ctx) => {
		delete (ctx.file.meta as any)[NAME]
	})

	it('should merge meta from beforeEach', ({ expect, task }) => {
		const meta = extractAutoSnapshotOptions(task)
		expect(meta).toEqual({ enable: true, failureThreshold: 0.01 })
	})

	it('should override existing meta with boolean', ({ expect, task }) => {
		setAutoSnapshotOptions(false)
		expect(extractAutoSnapshotOptions(task)).toEqual({ enable: false, failureThreshold: 0.01 })
	})

	it('should override existing meta with enable: false', ({ expect, task }) => {
		setAutoSnapshotOptions({ enable: false })
		expect(extractAutoSnapshotOptions(task)).toEqual({ enable: false, failureThreshold: 0.01 })
	})
})

describe('with no beforeAll and beforeEach', () => {
	beforeAll((ctx) => {
		delete (ctx.file.meta as any)[NAME]
	})

	beforeEach(({ task }) => {
		delete (task.meta as any)[NAME]
	})

	it('should enable snapshot by default', ({ expect, task }) => {
		setAutoSnapshotOptions(true)
		expect(extractAutoSnapshotOptions(task)).toEqual({ enable: true })
	})

	it('should set the provided meta', ({ expect, task }) => {
		setAutoSnapshotOptions({ failureThreshold: 0.01 })
		expect(extractAutoSnapshotOptions(task)).toEqual({ enable: true, failureThreshold: 0.01 })
	})

	it('should set enable to false when passing in false', ({ expect, task }) => {
		setAutoSnapshotOptions(false)
		expect(extractAutoSnapshotOptions(task)).toEqual({ enable: false })
	})
})

describe('disable snapshot during beforeAll', () => {
	beforeAll((ctx) => {
		delete (ctx.file.meta as any)[NAME]
		// this set the `suite` meta
		setAutoSnapshotOptions(false)
	})

	beforeEach(({ task }) => {
		delete (task.meta as any)[NAME]
	})

	it('should disable snapshot', ({ expect, task }) => {
		expect(extractAutoSnapshotOptions(task)).toEqual({ enable: false })
	})

	it('can override the disable snapshot', ({ expect, task }) => {
		setAutoSnapshotOptions({ enable: true })
		expect(extractAutoSnapshotOptions(task)).toEqual({ enable: true })
	})
})

it('can define additional meta', ({ expect, task }) => {
	setAutoSnapshotOptions({ foo: 'bar' })
	expect(extractAutoSnapshotOptions(task)).toMatchObject({ enable: true, foo: 'bar' })
})

it('reject snapshot key with dash', ({ expect }) => {
	expect(() => setAutoSnapshotOptions({ snapshotKey: 'invalid-key' })).toThrowError('Snapshot key cannot contain dash')
})
