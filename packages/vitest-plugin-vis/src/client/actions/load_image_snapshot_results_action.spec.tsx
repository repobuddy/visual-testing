import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { commands, page } from 'vitest/browser'
import { getCurrentTest } from '../external/vitest/vitest_suite_proxy.ts'
import { setAutoSnapshotOptions } from '../task/auto_snapshot_options.ts'
import { toTaskId } from '../task/task_id.ts'
import { loadImageSnapshotResultsAction } from './load_image_snapshot_results_action.ts'

it('returns empty array when no image snapshots', async () => {
	const results = await loadImageSnapshotResultsAction(commands, toTaskId(getCurrentTest()))
	expect(results).toEqual([])
})

it('returns image snapshots', async () => {
	setAutoSnapshotOptions(false)
	await render(<div>Test</div>)

	const hasSnapshot = await page.hasImageSnapshot({ snapshotKey: 'manual' })

	if (!hasSnapshot) {
		await page.toMatchImageSnapshot({ snapshotKey: 'manual' })
	}

	const test = getCurrentTest()
	const taskId = toTaskId(test)
	const results = await loadImageSnapshotResultsAction(commands, taskId)

	expect(results).toMatchObject([
		{
			filename: `${taskId}-manual.png`,
			baseline: expect.any(String),
		},
	])
})
