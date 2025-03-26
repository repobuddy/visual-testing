import { expect, it } from 'vitest'
import { stubBrowserCommandContext } from '../../testing.ts'
import { preparePageImageSnapshotComparison } from './prepare_page_image_snapshot_comparison.ts'

it('should throw error when testPath is not provided', async () => {
	await expect(() => preparePageImageSnapshotComparison(stubBrowserCommandContext(), '', false)).rejects.toThrow(
		`'commands.preparePageImageSnapshotComparison' requires testPath to be defined`,
	)
})
