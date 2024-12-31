import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setAutoSnapshotOptions } from '../client.ts'
import { NAME } from '../shared/constants.ts'
import { getAutoSnapshotOptions } from './snapshot_meta.ts'

beforeAll((ctx) => {
	// this set the `file` meta
	setAutoSnapshotOptions(ctx, { diffOptions: { threshold: 0.01 } })
})

beforeEach(({ task }) => {
	// this set the `task` meta
	setAutoSnapshotOptions(task, { failureThreshold: 0.01 })
})

it('is noop when task is undefined', () => {
	setAutoSnapshotOptions(undefined)
	getAutoSnapshotOptions(undefined)
})

it('should merge meta from beforeAll and beforeEach', ({ task }) => {
	const meta = getAutoSnapshotOptions(task)
	expect(meta).toEqual({ enable: true, diffOptions: { threshold: 0.01 }, failureThreshold: 0.01 })
})

describe('without beforeAll', () => {
	beforeAll((ctx) => {
		delete (ctx.file.meta as any)[NAME]
	})

	it('should merge meta from beforeEach', ({ task }) => {
		const meta = getAutoSnapshotOptions(task)
		expect(meta).toEqual({ enable: true, failureThreshold: 0.01 })
	})

	it('should override existing meta with boolean', ({ task }) => {
		setAutoSnapshotOptions(task, false)
		expect(getAutoSnapshotOptions(task)).toEqual({ enable: false })
	})

	it('should override existing meta with enable: false', ({ task }) => {
		setAutoSnapshotOptions(task, { enable: false })
		expect(getAutoSnapshotOptions(task)).toEqual({ enable: false })
	})
})

describe('with no beforeAll and beforeEach', () => {
	beforeAll((ctx) => {
		delete (ctx.file.meta as any)[NAME]
	})

	beforeEach(({ task }) => {
		delete (task.meta as any)[NAME]
	})

	it('should enable snapshot by default', ({ task }) => {
		setAutoSnapshotOptions(task)
		expect(getAutoSnapshotOptions(task)).toEqual({ enable: true })
	})

	it('should set the provided meta', ({ task }) => {
		setAutoSnapshotOptions(task, { failureThreshold: 0.01 })
		expect(getAutoSnapshotOptions(task)).toEqual({ enable: true, failureThreshold: 0.01 })
	})

	it('should set enable to false when passing in false', ({ task }) => {
		setAutoSnapshotOptions(task, false)
		expect(getAutoSnapshotOptions(task)).toEqual({ enable: false })
	})
})

describe('disable snapshot during beforeAll', () => {
	beforeAll((ctx) => {
		delete (ctx.file.meta as any)[NAME]
		// this set the `suite` meta
		setAutoSnapshotOptions(ctx, false)
	})

	beforeEach(({ task }) => {
		delete (task.meta as any)[NAME]
	})

	it('should disable snapshot', ({ task }) => {
		expect(getAutoSnapshotOptions(task)).toEqual({ enable: false })
	})

	it('can override the disable snapshot', ({ task }) => {
		setAutoSnapshotOptions(task, { enable: true })
		expect(getAutoSnapshotOptions(task)).toEqual({ enable: true })
	})
})
