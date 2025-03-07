// `storybook-addon-vis/vitest-setup` provides code needed in `vitest.setup.ts`.
import type { SnapshotMeta } from 'vitest-plugin-vis'
import { createVis } from 'vitest-plugin-vis/setup'
import { commands } from './client/vitest_proxy.ts'

export const vis = createVis<SnapshotMeta<any> & { tags: string[] }>(commands)
export { setAutoSnapshotOptions, type SnapshotMeta } from 'vitest-plugin-vis'
