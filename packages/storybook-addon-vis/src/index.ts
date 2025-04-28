// `storybook-addon-vis` provides code that can be used in test files.
import './client/storybook/expect_extend.ts'
import './shared/global_matcher_augment.ts'

export * from 'vitest-plugin-vis'
export * from './client/has_image_snapshot.ts'
export * from './client/storybook/param.ts'
export * from './client/storybook/tags.ts'
