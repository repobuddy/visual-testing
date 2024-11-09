import { state } from './state.js'
import { createVis } from './vis.js'

it('can define the snapshot root folder relative to the root of the project', async () => {
	await createVis({
		snapshotPath: '_sp_',
	}).beforeAll({ name: 'some.test.ts', file: { filepath: 'dummy/some.test.ts' } }),
		expect(state).toMatchObject({
			baselineDir: '_sp_/some.test.ts',
			diffDir: '_sp_/__diff_output__/some.test.ts',
			resultDir: '_sp_/__results__/some.test.ts',
		})
})
