import { afterEach, beforeAll } from 'vitest'
import { vis } from '../setup.ts'

beforeAll(() => vis.beforeAll.setup())
afterEach(() => vis.afterEach.matchImageSnapshot())
