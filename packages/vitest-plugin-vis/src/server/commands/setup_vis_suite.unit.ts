import { expect, it } from 'vitest'
import { stubBrowserCommandContext } from '../../testing.ts'
import { setupVisSuite } from './setup_vis_suite.ts'

it('should throw error when testPath is not provided', async () => {
	expect(() => setupVisSuite(stubBrowserCommandContext())).rejects.toThrow(
		`'commands.setupVisSuite' requires testPath to be defined`,
	)
})
