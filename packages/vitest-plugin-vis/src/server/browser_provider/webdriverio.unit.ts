import { expect, it, vi } from 'vitest'
import { webdriverio } from './webdriverio.ts'

function setup() {
	const calls: string[] = []
	const browser = {
		execute: vi.fn(async (_fn: any, ...args: any[]) => void calls.push(args.length > 1 ? 'add' : 'remove')),
		saveScreenshot: vi.fn(async () => void calls.push('shot')),
		$: vi.fn(async () => ({ saveScreenshot: async () => void calls.push('shot') })),
	}
	return { api: webdriverio({ browser } as any), browser, calls }
}

it('adds overlays before and removes them after the screenshot', async () => {
	const { api, calls } = setup()
	await api.takeScreenshot('/root', 'a.png', 'body', { mask: ['.t'] })
	expect(calls).toEqual(['add', 'shot', 'remove'])
})

it('removes overlays when the screenshot fails', async () => {
	const { api, browser, calls } = setup()
	browser.saveScreenshot.mockRejectedValueOnce(new Error('boom'))
	await expect(api.takePageScreenshot('/root', 'a.png', { mask: ['.t'] })).rejects.toThrow('boom')
	expect(calls).toEqual(['add', 'remove'])
})

it('does not touch the page without a mask', async () => {
	const { api, browser } = setup()
	await api.takePageScreenshot('/root', 'a.png', {})
	expect(browser.execute).not.toHaveBeenCalled()
})
