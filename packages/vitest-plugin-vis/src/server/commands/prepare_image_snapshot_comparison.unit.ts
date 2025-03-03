import { expect, it } from 'vitest'
import { stubBrowserCommandContext } from '../../testing.ts'
import { prepareImageSnapshotComparison } from './prepare_image_snapshot_comparison.ts'

it('should throw error when testPath is not provided', async () => {
	await expect(() => prepareImageSnapshotComparison(stubBrowserCommandContext(), '', '', false)).rejects.toThrow(
		`'commands.prepareImageSnapshotComparison' requires testPath to be defined`,
	)
})
