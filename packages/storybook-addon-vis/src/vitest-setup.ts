import { commands } from './client/@vitest/browser/context.ts'
import './client/expect/extend.ts'

import { createVis } from 'vitest-plugin-vis/setup'

export const vis = createVis(commands)
