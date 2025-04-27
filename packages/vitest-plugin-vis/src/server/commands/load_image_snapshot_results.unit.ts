import { expect, it } from 'vitest'
import { stubBrowserCommandContext } from '../../testing.ts'
import { loadImageSnapshotResults } from './load_image_snapshot_results.ts'

it('throws error without testPath', async () => {
	await expect(() => loadImageSnapshotResults(stubBrowserCommandContext(), '')).rejects.toThrow(
		`'commands.loadImageSnapshotResults' requires testPath to be defined`,
	)
})
