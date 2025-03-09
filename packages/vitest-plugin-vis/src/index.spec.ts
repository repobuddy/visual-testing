import { expect, it } from 'vitest'
import * as index from './index.ts'
import { setAutoSnapshotOptions } from './index.ts'

it('ensure extractAutoSnapshotOptions is not exported', () => {
	// @ts-expect-error
	index.extractAutoSnapshotOptions
})

it('export setAutoSnapshotOptions', () => {
	expect(setAutoSnapshotOptions).toBeTypeOf('function')
})
