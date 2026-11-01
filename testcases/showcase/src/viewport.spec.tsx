import { it } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { PlanGrid } from './showcase.tsx'

it('plan grid per viewport', async ({ expect }) => {
	setAutoSnapshotOptions(false)
	await render(<PlanGrid />)

	await page.viewport(480, 720)
	await expect(document.body).toMatchImageSnapshot({ snapshotKey: 'phone' })

	await page.viewport(1024, 720)
	await expect(document.body).toMatchImageSnapshot({ snapshotKey: 'desktop' })
})
