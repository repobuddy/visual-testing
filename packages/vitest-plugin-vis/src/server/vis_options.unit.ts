import { describe, expect, it } from 'vitest'
import { stubBrowserCommandContext } from './testing/stubBrowserCommandContext.ts'
import { getVisOption, setVisOption } from './vis_options.ts'

describe(`${setVisOption.name}`, () => {
	it('should create a project with the given name and root', () => {
		const name = 'test-project'

		setVisOption(
			{ test: { name } },

			{},
		)

		const project = getVisOption(
			stubBrowserCommandContext({
				project: {
					runner: {
						config: {
							name,
						},
					},
				},
			}),
		)
		expect(project).toEqual({})
	})
})
