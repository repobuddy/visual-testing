import { afterEach, beforeAll } from 'vitest'
import '../client/expect/extend.ts'
import '../client/page/extend.ts'
import { vis } from '../setup/vis.ts'

beforeAll(() => vis.beforeAll.setup())
afterEach(() => vis.afterEach.matchImageSnapshot())
