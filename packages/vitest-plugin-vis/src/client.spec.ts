import { it } from 'vitest'
import * as index from './index.ts'

it('ensure extractAutoSnapshotOptions is not exported', () => {
	// @ts-expect-error
	index.extractAutoSnapshotOptions
})
