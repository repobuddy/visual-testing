import { setAutoSnapshotOptions } from '#storybook-addon-vis/vitest-setup'
import React from 'react'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { autoSnapshotMatcher } from 'vitest-plugin-vis/client-api'
import { commands, page, server } from 'vitest/browser'

const themeSnapshots = autoSnapshotMatcher(commands, expect)

describe('auto snapshot with createMissingBaseline', () => {
	beforeAll(async () => {
		await themeSnapshots.setup()
	})
	beforeEach(() => setAutoSnapshotOptions(true))

	it('writes baseline when missing if createMatcher runs under updateSnapshot all', async () => {
		setAutoSnapshotOptions(true)
		const snapshotKey = 'create_missing_baseline_sav_auto_theme'
		const snap = server.config.snapshotOptions
		const prevUpdate = snap.updateSnapshot
		snap.updateSnapshot = 'all'
		try {
			await render(<div data-testid="subject">save new auto</div>)
			if (!(await page.hasImageSnapshot({ snapshotKey }))) {
				await themeSnapshots.createMatcher({
					[snapshotKey]: async () => {},
				})()
			}
			expect(await page.hasImageSnapshot({ snapshotKey })).toBe(true)
		} finally {
			snap.updateSnapshot = prevUpdate
			setAutoSnapshotOptions({ enable: false })
		}
	})
})
