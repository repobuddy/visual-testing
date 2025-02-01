import { describe, it } from 'vitest'
import { toTaskId } from './task_id.ts'

it('should convert task name to lowercase and replace non-alphanumeric characters with hyphens', ({ expect }) => {
	expect(toTaskId({ name: 'TaskName' })).toBe('taskname')
	expect(toTaskId({ name: 'Task Name' })).toBe('task-name')
	expect(toTaskId({ name: 'Task-Name' })).toBe('task-name')
	expect(toTaskId({ name: 'Task_Name' })).toBe('task-name')
	expect(toTaskId({ name: 'Task@Name' })).toBe('task-name')
})

it('should handle empty string', ({ expect }) => {
	expect(toTaskId({ name: '' })).toBe('')
})

it('should handle string with only non-alphanumeric characters', ({ expect }) => {
	expect(toTaskId({ name: '@@@' })).toBe('---')
})

it('should handle string with mixed case and special characters', ({ expect }) => {
	expect(toTaskId({ name: 'Task@Name123' })).toBe('task-name123')
})

it('should convert task name to lowercase and replace non-alphanumeric characters with hyphens', ({ expect, task }) => {
	expect(toTaskId(task)).to.equal(
		'should-convert-task-name-to-lowercase-and-replace-non-alphanumeric-characters-with-hyphens',
	)
})

describe('nested level 1', () => {
	it('should include nesting', ({ expect, task }) => {
		expect(toTaskId(task)).to.equal('nested-level-1/should-include-nesting')
	})
	describe('nested level 2', () => {
		it('should include nesting', ({ expect, task }) => {
			expect(toTaskId(task)).to.equal('nested-level-1/nested-level-2/should-include-nesting')
		})
	})
})
