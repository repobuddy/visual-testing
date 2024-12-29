// `page.imageSnapshot()` works because `./page/extend.ts` is imported in `./index.ts`,
// which is imported in `./vitest.setup.webdriverio.ts` and `./vitest.setup.playwright.ts`.

import { page } from '@vitest/browser/context'
import { afterEach, expect, it } from 'vitest'
import { imageSnapshotStubSymbol, imageSnapshotSymbol } from './image_snapshot.ts'
import { ctx } from './page/ctx.ts'

afterEach(() => ctx.__test__reset())

it('returns a stub result when not running in test', async () => {
	ctx.getCurrentTest = () => undefined as any
	expect(await page.imageSnapshot()).toEqual({
		type: imageSnapshotStubSymbol,
		base64: '',
		resultPath: '',
	})
})

it('throws an error when running in a concurrent test', async () => {
	ctx.getCurrentTest = () => ({ concurrent: true }) as any
	expect(() => page.imageSnapshot()).toThrow(
		`Cannot take a screenshot in a concurrent test because concurrent tests run at the same time in the same iframe and affect each other's environment. Use a non-concurrent test to take a screenshot.`,
	)
})

it('takes a snapshot of the current page', async () => {
	page.render(<div>hello</div>)
	const snapshot = await page.imageSnapshot()
	expect(snapshot.type).toBe(imageSnapshotSymbol)
	expect(snapshot.base64).toBeDefined()
	expect(snapshot.resultPath).toBeDefined()
})
