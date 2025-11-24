import { describe, it } from 'vitest'
import { isSnapshotEnabled } from './tags.ts'

describe('isSnapshotEnabled', () => {
	it('returns undefined when tags array is empty', ({ expect }) => {
		expect(isSnapshotEnabled([])).toBeUndefined()
	})

	it('returns undefined when neither snapshot nor !snapshot tags exist', ({ expect }) => {
		expect(isSnapshotEnabled(['other', 'tags'])).toBeUndefined()
		expect(isSnapshotEnabled(['test', 'story'])).toBeUndefined()
	})

	it('returns true when only snapshot tag exists', ({ expect }) => {
		expect(isSnapshotEnabled(['snapshot'])).toBe(true)
		expect(isSnapshotEnabled(['other', 'snapshot', 'tags'])).toBe(true)
	})

	it('returns false when only !snapshot tag exists', ({ expect }) => {
		expect(isSnapshotEnabled(['!snapshot'])).toBe(false)
		expect(isSnapshotEnabled(['other', '!snapshot', 'tags'])).toBe(false)
	})

	it('returns true when snapshot comes after !snapshot', ({ expect }) => {
		expect(isSnapshotEnabled(['!snapshot', 'snapshot'])).toBe(true)
		expect(isSnapshotEnabled(['other', '!snapshot', 'tags', 'snapshot'])).toBe(true)
	})

	it('returns false when !snapshot comes after snapshot', ({ expect }) => {
		expect(isSnapshotEnabled(['snapshot', '!snapshot'])).toBe(false)
		expect(isSnapshotEnabled(['other', 'snapshot', 'tags', '!snapshot'])).toBe(false)
	})

	it('returns true when multiple snapshot tags exist and last is snapshot', ({ expect }) => {
		expect(isSnapshotEnabled(['snapshot', 'other', 'snapshot'])).toBe(true)
		expect(isSnapshotEnabled(['snapshot', '!snapshot', 'snapshot'])).toBe(true)
	})

	it('returns false when multiple !snapshot tags exist and last is !snapshot', ({ expect }) => {
		expect(isSnapshotEnabled(['!snapshot', 'other', '!snapshot'])).toBe(false)
		expect(isSnapshotEnabled(['snapshot', '!snapshot', '!snapshot'])).toBe(false)
	})

	it('uses lastIndexOf to determine which tag wins', ({ expect }) => {
		expect(isSnapshotEnabled(['snapshot', '!snapshot', 'snapshot', 'other'])).toBe(true)
		expect(isSnapshotEnabled(['!snapshot', 'snapshot', '!snapshot', 'other'])).toBe(false)
	})

	it('handles tags with similar names correctly', ({ expect }) => {
		expect(isSnapshotEnabled(['snapshot-test', 'snapshot'])).toBe(true)
		expect(isSnapshotEnabled(['!snapshot-test', '!snapshot'])).toBe(false)
		expect(isSnapshotEnabled(['snapshot-test', 'snapshot', '!snapshot-test'])).toBe(true)
	})
})
