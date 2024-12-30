import { expect, it } from 'vitest'
import { visContext } from '../server/vis_context.ts'
import { NAME } from '../shared/contants.ts'
import type { VisOptions } from '../vitest-plugin.ts'
import { storybookVis } from '../vitest-plugin.ts'

it('can be called without options', () => {
	storybookVis()
	expect(visContext.getOptions()).toEqual({})
})

it('can be called with undefined options', () => {
	storybookVis(undefined)
	expect(visContext.getOptions()).toEqual({})
})

it('can be called with options', () => {
	const options: VisOptions = {}
	storybookVis(options)
	expect(visContext.getOptions()).toBe(options)
})

it('returns a storybook-addon-vis plugin object', () => {
	const plugin = storybookVis()
	expect(plugin.name).toBe(NAME)
	expect(plugin.config).toBeTypeOf('function')
})

it('register commands', () => {
	const plugin = storybookVis()
	const config = plugin.config()
	expect(config).toEqual({
		test: {
			browser: {
				name: undefined,
				commands: {
					existDir: expect.any(Function),
					existFile: expect.any(Function),
					copyFile: expect.any(Function),
					getSnapshotPlatform: expect.any(Function),
					rmDir: expect.any(Function),
					isCI: expect.any(Function),
					setupVisSuite: expect.any(Function),
					imageSnapshot: expect.any(Function),
					matchImageSnapshot: expect.any(Function),
				},
			},
		},
	})
})
