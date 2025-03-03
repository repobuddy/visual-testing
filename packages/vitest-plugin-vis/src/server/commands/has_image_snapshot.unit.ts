import { expect, it } from 'vitest'
import { stubBrowserCommandContext } from '../../testing.ts'
import { hasImageSnapshot } from './has_image_snapshot.ts'

it('throws error without testPath', async () => {
	await expect(() => hasImageSnapshot(stubBrowserCommandContext(), '', undefined, false)).rejects.toThrow(
		`'commands.hasImageSnapshot' requires testPath to be defined`,
	)
})
