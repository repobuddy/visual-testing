import { it } from 'vitest'
import * as client from './client.ts'

it('ensure extractAutoSnapshotOptions is not exported', () => {
	// @ts-expect-error
	client.extractAutoSnapshotOptions
})
