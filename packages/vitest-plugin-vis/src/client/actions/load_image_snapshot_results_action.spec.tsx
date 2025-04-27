import { commands } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { getCurrentTest } from '../vitest_suite_proxy.ts'
import { loadImageSnapshotResultsAction } from './load_image_snapshot_results_action.ts'

it('returns empty array when no image snapshots', async () => {
	const results = await loadImageSnapshotResultsAction(commands, getCurrentTest())
	expect(results).toEqual([])
})
