import { beforeAll, it } from 'vitest'
import { setAutoSnapshotOptions } from '../client.ts'
import { extractAutoSnapshotOptions } from './snapshot_options.ts'

beforeAll(() => setAutoSnapshotOptions(false))

it('can disable snapshot using beforeAll', ({ expect, task }) => {
	expect(extractAutoSnapshotOptions(task)).toEqual({
		enable: false,
	})
})
