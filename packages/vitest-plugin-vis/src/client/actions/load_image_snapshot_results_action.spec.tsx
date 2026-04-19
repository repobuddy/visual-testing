import { setAutoSnapshotOptions } from '#vitest-plugin-vis'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { commands, page } from 'vitest/browser'
import { loadImageSnapshotResultsAction, toTaskId } from '../../exports/client-api.ts'
import { getCurrentTest } from '../external/vitest/vitest_suite_proxy.ts'

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
