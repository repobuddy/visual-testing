import { it } from 'vitest'
import { render } from 'vitest-browser-react'
import { PlanGrid } from './showcase.tsx'

// No assertion: the `auto` preset captures the page after the test.
it('plan grid', async () => {
	await render(<PlanGrid />)
})
