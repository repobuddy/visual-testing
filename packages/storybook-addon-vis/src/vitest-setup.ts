// `storybook-addon-vis/vitest-setup` provides code needed in `vitest.setup.ts`.
import './client/storybook/expect_extend.ts'
import './shared/global_matcher_augment.ts'

import '../../setup/create_vis.ts' // for Vitest extends
import { createVis } from '../../setup/create_vis.ts'
import { commands } from './client/vitest_proxy.ts'

export const vis = createVis<{ tags: string[] }>(commands)
export { setAutoSnapshotOptions } from 'vitest-plugin-vis'
export { visAnnotations } from './preview/vis_annotation.ts'
