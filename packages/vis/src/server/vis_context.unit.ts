import { relative } from 'pathe'
import { it } from 'vitest'
import { visContext } from './vis_context'

it('get', async () => {
	await visContext.getState({
		config: {
			root: relative(import.meta.dirname, '../..'),
			hookTimeout: 15000,
			testTimeout: 30000,
			snapshotOptions: {
				updateSnapshot: 'new',
			},
		},
	})
})
