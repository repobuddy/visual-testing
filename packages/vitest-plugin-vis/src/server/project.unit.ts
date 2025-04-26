import { describe, expect, it } from 'vitest'
import { getProjectId, getProjectName, getProjectRoot } from './project.ts'

describe('getProjectName', () => {
	it('should return the project name if it exists', () => {
		const context = {
			project: {
				vite: {
					config: {
						test: {
							name: 'my-project',
						},
					},
				},
			},
		}
		const result = getProjectName(context)
		expect(result).toBe('my-project')
	})

	it('should return undefined if the project name does not exist', () => {
		const context = {
			project: {
				vite: {
					config: {
						test: {},
					},
				},
			},
		}
		const result = getProjectName(context)
		expect(result).toBeUndefined()
	})

	it('should return undefined if the test config is not defined', () => {
		const context = {
			project: {
				vite: {
					config: {},
				},
			},
		}
		const result = getProjectName(context)
		expect(result).toBeUndefined()
	})
})

describe('getProjectRoot', () => {
	it('should return the root of the project from the context', () => {
		const mockContext = {
			project: {
				config: {
					root: '/path/to/project',
				},
			},
		}

		const result = getProjectRoot(mockContext)
		expect(result).toBe('/path/to/project')
	})
})

describe('getProjectId', () => {
	it('should return the correct project ID', () => {
		const context = {
			project: {
				config: {
					root: '/path/to/project',
					name: 'my-project',
				},
			},
		}

		const result = getProjectId(context)
		expect(result).toBe('/path/to/project/my-project')
	})

	it('should handle empty root and name gracefully', () => {
		const context = {
			project: {
				config: {
					root: '',
					name: '',
				},
			},
		}

		const result = getProjectId(context)
		expect(result).toBe('/')
	})

	it('should handle missing name property', () => {
		const context = {
			project: {
				config: {
					root: '/path/to/project',
					name: undefined as unknown as string,
				},
			},
		}

		const result = getProjectId(context)
		expect(result).toBe('/path/to/project/undefined')
	})
})
