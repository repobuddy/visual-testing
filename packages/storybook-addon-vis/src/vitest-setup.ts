import { commands } from './client/@vitest/browser/context.ts'
import './client/expect/extend.ts'

import { createVis } from 'vitest-plugin-vis/client'

export const vis = createVis(commands)
