import { afterEach, beforeAll } from 'vitest'
import { setAutoSnapshotOptions } from '../client-api.ts'
import '../client/expect/extend.ts'
import '../client/page/extend.ts'
import { vis } from '../setup/vis.ts'

beforeAll(() => {
	vis.beforeAll.setup()
	setAutoSnapshotOptions(true)
})
afterEach(() => vis.afterEach.matchImageSnapshot())
