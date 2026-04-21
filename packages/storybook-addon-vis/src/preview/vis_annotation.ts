import type { NamedOrDefaultProjectAnnotations } from 'storybook/internal/types'
import { expect } from 'storybook/test'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { toMatchImageSnapshot } from '../client/expect/to_match_image_snapshot.ts'
import { isSnapshotEnabled } from '../client/storybook/tags.ts'
import { getCurrentTest } from '../client/vitest_proxy.ts'

let extended = false

export const visAnnotations = {
	beforeEach(ctx) {
		if (!extended) {
			expect.extend({ toMatchImageSnapshot })
			extended = true
		}
		const test = getCurrentTest()

		setAutoSnapshotOptions({
			enable: isSnapshotEnabled(ctx.tags),
			...ctx.parameters?.snapshot,
			tags: ctx.tags,
			...test?.meta.vis,
		})
	},
} satisfies NamedOrDefaultProjectAnnotations<any>
