import { beforeAll, it } from 'vitest'
import { setAutoSnapshotOptions } from '../client.ts'
import { getAutoSnapshotOptions } from './snapshot_options.internal.ts'

beforeAll(() => setAutoSnapshotOptions(false))

it('can disable snapshot using beforeAll', ({ expect, task }) => {
	expect(getAutoSnapshotOptions(task)).toEqual({
		enable: false,
	})
})
