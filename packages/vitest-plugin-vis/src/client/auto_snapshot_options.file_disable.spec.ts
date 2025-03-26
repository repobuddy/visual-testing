import { beforeAll, it } from 'vitest'
import { setAutoSnapshotOptions } from '../client-api.ts'
import { extractAutoSnapshotOptions } from './auto_snapshot_options.ts'

beforeAll(() => setAutoSnapshotOptions(false))

it('can disable snapshot using beforeAll', ({ expect, task }) => {
	expect(extractAutoSnapshotOptions(task)).toEqual({
		enable: false,
	})
})
