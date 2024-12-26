import { describe, expect, it } from 'vitest'
import { toSnapshotId } from './snapshot_id.ts'

describe('toSnapshotId', () => {
	it('should convert task name to lowercase and replace non-alphanumeric characters with hyphens', () => {
		expect(toSnapshotId('TaskName')).toBe('taskname')
		expect(toSnapshotId('Task Name')).toBe('task-name')
		expect(toSnapshotId('Task-Name')).toBe('task-name')
		expect(toSnapshotId('Task_Name')).toBe('task-name')
		expect(toSnapshotId('Task@Name')).toBe('task-name')
	})

	it('should handle empty string', () => {
		expect(toSnapshotId('')).toBe('')
	})

	it('should handle string with only non-alphanumeric characters', () => {
		expect(toSnapshotId('@@@')).toBe('---')
	})

	it('should handle string with mixed case and special characters', () => {
		expect(toSnapshotId('Task@Name123')).toBe('task-name123')
	})
})
