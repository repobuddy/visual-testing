import React from 'react'
import { beforeEach, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { page, server } from 'vitest/browser'
import { hasImageSnapshot } from '../../index.ts'
import { setAutoSnapshotOptions } from '../../vitest-setup.ts'

beforeEach(() => setAutoSnapshotOptions({ enable: false }))

// Storybook Vitest browser RPC may drop `createMissingBaseline`; use updateSnapshot 'all' for missing-baseline bootstrap (see overview.mdx).
it('writes missing baseline when updateSnapshot is all', async () => {
	await render(<div data-testid="subject">save new page</div>)
	const snapshotKey = 'create_missing_baseline_storybook_page'
	const snap = server.config.snapshotOptions
	const prevUpdate = snap.updateSnapshot
	snap.updateSnapshot = 'all'
	try {
		if (!(await hasImageSnapshot({ snapshotKey }))) {
			await page.toMatchImageSnapshot({ snapshotKey })
		}
		expect(
			await hasImageSnapshot({
				snapshotKey,
			}),
		).toBe(true)
		await page.toMatchImageSnapshot({ snapshotKey })
	} finally {
		snap.updateSnapshot = prevUpdate
	}
})

it('takes a viewport snapshot with custom key', async () => {
	await render(<div style={{ height: '400px', backgroundColor: 'teal' }}>page snapshot</div>)
	const snapshotKey = 'storybook_page_custom'
	const snap = server.config.snapshotOptions
	const prevUpdate = snap.updateSnapshot
	snap.updateSnapshot = 'all'
	try {
		if (!(await hasImageSnapshot({ snapshotKey }))) {
			await page.toMatchImageSnapshot({ snapshotKey })
		} else {
			await page.toMatchImageSnapshot({ snapshotKey })
		}
		expect(
			await hasImageSnapshot({
				snapshotKey,
			}),
		).toBe(true)
	} finally {
		snap.updateSnapshot = prevUpdate
	}
})
