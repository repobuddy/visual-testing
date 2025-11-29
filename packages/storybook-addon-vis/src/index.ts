// `storybook-addon-vis` provides code that can be used in test files.
import './client/storybook/expect_extend.ts'
import './shared/global_matcher_augment.ts'

import { vis, type SetupVisOptions } from 'vitest-plugin-vis/setup'
import { page } from './client/vitest_proxy.ts'
import { visAnnotations } from './preview/vis_annotation.ts'

export * from 'vitest-plugin-vis'
export * from './client/has_image_snapshot.ts'
export * from './client/storybook/param.ts'
export * from './client/storybook/tags.ts'

export { page }

export default (options: SetupVisOptions = {}) => {
	vis.setup(options)
	return {
		tags: options.auto ? ['snapshot'] : [],
		...visAnnotations,
	}
}
