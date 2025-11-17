import { describe, expect, it } from 'vitest'
import { stubBrowserCommandContext } from '../testing.ts'
import { getProjectName, getProjectRoot } from './project.ts'

describe('getProjectName', () => {
	it('should return the project name if it exists', () => {
		const context = stubBrowserCommandContext({
			project: {
				runner: {
					config: {
						name: 'my-project',
					},
				},
			},
		})
		const result = getProjectName(context)
		expect(result).toBe('my-project')
	})

	it('should return undefined if the project name does not exist', () => {
		const context = stubBrowserCommandContext({
			project: {
				runner: {
					config: {
						name: undefined,
					},
				},
			},
		})
		const result = getProjectName(context)
		expect(result).toBeUndefined()
	})

	it('should return undefined if the test config is not defined', () => {
		const context = stubBrowserCommandContext({
			project: {
				runner: {
					config: {},
				},
			},
		})
		const result = getProjectName(context)
		expect(result).toBeUndefined()
	})

	it.skip('should return the project name if the test config is an object with a label', () => {
		const context = stubBrowserCommandContext({
			project: {
				runner: {
					config: {
						// seems like this feature is removed in vitest
						name: {
							label: 'my-project',
						} as any,
					},
				},
			},
		})
		const result = getProjectName(context)
		expect(result).toBe('my-project')
	})
})

describe('getProjectRoot', () => {
	it('should return the root of the project from the context', () => {
		const mockContext = stubBrowserCommandContext({
			project: {
				config: {
					root: '/path/to/project',
				},
			},
		})

		const result = getProjectRoot(mockContext)
		expect(result).toBe('/path/to/project')
	})
})
