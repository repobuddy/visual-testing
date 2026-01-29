import { setAutoSnapshotOptions } from '#vitest-plugin-vis'
import { beforeAll, it } from 'vitest'
import { extractAutoSnapshotOptions } from './_extract_auto_snapshot_options.ts'

beforeAll(() => setAutoSnapshotOptions(false))

it('can disable snapshot using beforeAll', ({ expect, task }) => {
	expect(extractAutoSnapshotOptions(task)).toEqual({
		enable: false,
	})
})
