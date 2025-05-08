import { afterEach, beforeAll } from 'vitest'
import { setAutoSnapshotOptions } from '../index.ts'
import { vis } from '../setup.ts'

beforeAll(() => {
	vis.beforeAll.setup()
	setAutoSnapshotOptions(true)
})
afterEach(() => vis.afterEach.matchImageSnapshot())
