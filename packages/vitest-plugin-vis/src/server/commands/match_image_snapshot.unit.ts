import { expect, it } from 'vitest'
import { stubBrowserCommandContext } from '../../testing.ts'
import { matchImageSnapshot } from './match_image_snapshot.ts'

it('throws error without testPath', async () => {
	await expect(() => matchImageSnapshot(stubBrowserCommandContext(), 'image name', 'subject', false)).rejects.toThrow(
		`'commands.matchImageSnapshot' requires testPath to be defined`,
	)
})
