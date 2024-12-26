// `page.imageSnapshot()` works because `./page/extend.ts` is imported in `./index.ts`,
// which is imported in `./vitest.setup.webdriverio.ts` and `./vitest.setup.playwright.ts`.

import { page } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { ctx } from './image_snapshot.ctx.ts'
import { imageSnapshotStubSymbol } from './image_snapshot.ts'

it('returns a stub result when not running in test', async () => {
	ctx.getCurrentTest = () => undefined as any
	expect(await page.imageSnapshot()).toEqual({
		type: imageSnapshotStubSymbol,
		base64: '',
		resultPath: '',
	})
})
