import { setAutoSnapshotOptions, vis } from '#storybook-addon-vis/vitest-setup'
import { testType } from 'type-plus'
import { beforeAll, describe, expect, it } from 'vitest'
import type { SetupVisOptions } from 'vitest-plugin-vis'
import type { ToMatchImageSnapshotOptions } from 'vitest-plugin-vis/client-api'

beforeAll(() => setAutoSnapshotOptions(false))

describe('vis.setup theme auto', () => {
	it('provides tags in options', () => {
		vis.setup({
			auto: {
				x(options) {
					testType.equal<typeof options.tags, string[]>(true)
					expect(options.tags).toEqual([])
				},
			},
		})
	})
	it('can customize the option type', () => {
		const auto = {
			x(_options: ToMatchImageSnapshotOptions<'ssim'> & { tags: string[] }) {
				testType.canAssign<
					typeof _options.diffOptions,
					{ ssim?: 'fast' | 'original' | 'bezkrovny' | 'weber' | undefined }
				>(true)
			},
		} satisfies Record<string, unknown>
		vis.setup({
			auto: auto as NonNullable<SetupVisOptions<{ tags: string[] }>['auto']>,
		})
	})
})
