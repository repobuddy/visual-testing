import { it } from 'vitest'
import * as client from './client-api.ts'

it('ensure extractAutoSnapshotOptions is not exported', () => {
	// @ts-expect-error
	client.extractAutoSnapshotOptions
})
