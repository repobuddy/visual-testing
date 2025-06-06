import { testType } from 'type-plus'
import { beforeAll, describe, expect, it } from 'vitest'
import { setAutoSnapshotOptions, vis } from './vitest-setup.ts'

beforeAll(() => setAutoSnapshotOptions(false))

describe('vis.presets.theme()', () => {
	it('provides tags in options', () => {
		vis.presets.theme({
			x(options) {
				testType.equal<typeof options.tags, string[]>(true)
				expect(options.tags).toEqual([])
			},
		})
	})
	it('can customize the option type', () => {
		vis.presets.theme<'ssim'>({
			x(options) {
				testType.canAssign<
					typeof options.diffOptions,
					{ ssim?: 'fast' | 'original' | 'bezkrovny' | 'weber' | undefined }
				>(true)
			},
		})
	})
})
