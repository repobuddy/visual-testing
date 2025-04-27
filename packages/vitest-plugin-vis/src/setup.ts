// `vitest-plugin-vis/setup` provides code needed in `vitest.setup.ts`.
import './client/expect/extend.ts'
import './client/page/extend.ts'

export * from './client/setup/vis.ts'

// This is exported for main/app boundary separation
// They can co-exist in the same export file thanks to ESM.
export * from './client/setup/create_vis.ts'
