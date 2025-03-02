import { it } from 'vitest'
import * as client from './client.ts'

it('ensure getAutoSnapshotOptions is not exported', () => {
	// @ts-expect-error
	client.getAutoSnapshotOptions
})
