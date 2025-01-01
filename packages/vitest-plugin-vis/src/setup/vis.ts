import { commands } from '@vitest/browser/context'
import { createVis } from '../client/create_vis.ts'

/**
 * Visual test configuration on the client side.
 */
export const vis = createVis(commands)
