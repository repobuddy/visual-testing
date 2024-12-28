import { stub } from 'type-plus'
import { expect, it } from 'vitest'
import type { BrowserCommandContext } from 'vitest/node'
import { imageSnapshot } from './image_snapshot.ts'

const stubContext = stub.build<BrowserCommandContext>({})

it('throws error without testPath', async () => {
	await expect(() => imageSnapshot(stubContext(), 'image name')).rejects.toThrow(
		'Cannot take snapshot without testPath',
	)
})
