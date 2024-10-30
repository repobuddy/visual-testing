import { storybookVis } from './vitest-plugin'

it('name as `vitest:storybook-addon-vis`', () => {
	const plugin = storybookVis()
	expect(plugin.name).toBe('vitest:storybook-addon-vis')
})

it('register commands', () => {
	const plugin = storybookVis()
	const config = plugin.config()
	expect(config).toEqual({
		test: {
			browser: {
				name: 'chromium',
				commands: {
					existDir: expect.any(Function),
					copyFile: expect.any(Function),
					getSnapshotPlatform: expect.any(Function),
					hasSnapshot: expect.any(Function),
					rmDir: expect.any(Function),
					isCI: expect.any(Function),
				},
			},
		},
	})
})
