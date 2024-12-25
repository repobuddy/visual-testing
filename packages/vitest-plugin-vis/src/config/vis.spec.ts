import { expect, it } from 'vitest'
import { vis } from '../config.ts'
import { visContext } from '../server/vis_context.ts'

it('can be used with zero config', () => {
	expect(vis()).toBeDefined()
})

it('defines default config', () => {
	vis()
	expect(visContext.getOptions()).toEqual({
		snapshotRootDir: '__vis__',
	})
})
