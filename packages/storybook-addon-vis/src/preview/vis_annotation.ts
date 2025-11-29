import type { NamedOrDefaultProjectAnnotations } from 'storybook/internal/types'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { isSnapshotEnabled } from '../client/storybook/tags.ts'
import { getCurrentTest } from '../client/vitest_proxy.ts'

export const visAnnotations = {
	beforeEach(ctx) {
		const test = getCurrentTest()

		setAutoSnapshotOptions({
			enable: isSnapshotEnabled(ctx.tags),
			...ctx.parameters?.snapshot,
			tags: ctx.tags,
			...test?.meta.vis,
		})
	},
} satisfies NamedOrDefaultProjectAnnotations<any>
