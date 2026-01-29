import './setup-api.ts'

export * from './setup/vis.ts'

import { createVis as createVisDeprecated } from './setup/create_vis.ts'

/**
 * @deprecated Use `createVis` from `vitest-plugin-vis/setup-api` instead.
 */
export const createVis = createVisDeprecated
