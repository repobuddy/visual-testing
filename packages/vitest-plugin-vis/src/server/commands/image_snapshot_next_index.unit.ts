import { expect, it } from 'vitest'
import { stubBrowserCommandContext } from '../../testing.ts'
import { imageSnapshotNextIndex } from './image_snapshot_next_index.ts'

it('throws error without testPath', async () => {
	await expect(() => imageSnapshotNextIndex(stubBrowserCommandContext(), '')).rejects.toThrow(
		`'commands.imageSnapshotNextIndex' requires testPath to be defined`,
	)
})
