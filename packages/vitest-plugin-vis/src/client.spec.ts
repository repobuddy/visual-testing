import { it } from 'vitest'
import * as index from './index.ts'

it('ensure getAutoSnapshotOptions is not exported', () => {
	// @ts-expect-error
	index.getAutoSnapshotOptions
})
