import { it } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { PlanGrid } from './showcase.tsx'

it('team plan', async ({ expect }) => {
	setAutoSnapshotOptions(false)
	await render(<PlanGrid />)
	await expect(page.getByTestId('plan-team')).toMatchImageSnapshot({ snapshotKey: 'team_plan' })
})
