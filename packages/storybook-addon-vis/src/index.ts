// `storybook-addon-vis` provides code that can be used in test files.
import './client/storybook/expect_extend.ts'
import './shared/global_matcher_augment.ts'

import { definePreviewAddon } from 'storybook/internal/csf'
import { expect } from 'storybook/test'
import type { SetupVisOptions } from 'vitest-plugin-vis'
import { autoSnapshotMatcher, setAutoSnapshotOptions } from 'vitest-plugin-vis/client-api'
import { commands, page } from './client/vitest_proxy.ts'
import { visAnnotations } from './preview/vis_annotation.ts'

export * from 'vitest-plugin-vis'
export * from './client/has_image_snapshot.ts'
export * from './client/storybook/param.ts'
export * from './client/storybook/tags.ts'

export { page }

export default (options: SetupVisOptions = { auto: false }) => {
	let matcher: ReturnType<typeof autoSnapshotMatcher>
	let matcherFn: () => Promise<void>
	return definePreviewAddon({
		tags: options.auto ? ['snapshot'] : [],
		async beforeAll() {
			matcher = autoSnapshotMatcher(commands, expect)
			if (typeof options?.auto === 'function') {
				matcherFn = matcher.createMatcher({
					auto: options.auto,
				})
			} else if (typeof options?.auto === 'object') {
				matcherFn = matcher.createMatcher(options.auto)
			} else matcherFn = matcher.createMatcher({ async auto() {} })

			await matcher.setup()
			await setAutoSnapshotOptions(true)
		},
		afterEach() {
			if (matcherFn) {
				return matcherFn()
			}
		},
		...visAnnotations,
	})
}
