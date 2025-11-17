import { commands } from 'vitest/browser'
import { createVis } from './create_vis.ts'

/**
 * Visual test configuration on the client side.
 */
export const vis = createVis(commands)
