import { describe, expect, it } from 'vitest'
import { getVisOption, setVisOption } from './vis_options.ts'

describe(`${setVisOption.name}`, () => {
	it('should create a project with the given name and root', () => {
		const name = 'test-project'

		setVisOption(
			{ test: { name } },

			{},
		)

		const project = getVisOption({
			project: {
				vitest: {
					config: {
						name,
					},
				},
			},
		})
		expect(project).toEqual({})
	})
})
