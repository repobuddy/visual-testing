import { expect, it } from 'vitest'
import { stubBrowserCommandContext } from '../testing/stubBrowserCommandContext.ts'
import { setupVisSuite } from './setup_vis_suite.ts'

it('should throw error when testPath is not provided', async () => {
	await expect(() => setupVisSuite(stubBrowserCommandContext() as any)).rejects.toThrow(
		`'commands.setupVisSuite' requires testPath to be defined`,
	)
})
