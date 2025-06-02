// `vitest-plugin-vis/setup` provides code needed in `vitest.setup.ts`.
import './client/expect/extend.ts'
import './client/page/extend.ts'

export * from './client/setup/vis.ts'

// This is deprecated and moved to `/client-api`.
export * from './client/setup/create_vis.ts'
