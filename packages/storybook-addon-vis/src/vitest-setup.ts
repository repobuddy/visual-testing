// `storybook-addon-vis/vitest-setup` provides code needed in `vitest.setup.ts`.
import { createVis } from 'vitest-plugin-vis/setup'
import { commands } from './client/@vitest/browser/context.ts'
import './client/expect/extend.ts'

export const vis = createVis(commands)
