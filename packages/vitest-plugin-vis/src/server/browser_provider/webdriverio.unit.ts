import { expect, it, vi } from 'vitest'
import { webdriverio } from './webdriverio.ts'

function setup() {
	const calls: string[] = []
	const browser = {
		execute: vi.fn(async (_fn: any, ...args: any[]) => void calls.push(args.length > 1 ? 'add' : 'remove')),
		saveScreenshot: vi.fn(async () => void calls.push('shot')),
		$: vi.fn(async () => ({ saveScreenshot: async () => void calls.push('shot') })),
	}
	return { api: webdriverio({ browser, provider: {} } as any), browser, calls }
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

function setupFullPage({ switched = true } = {}) {
	const calls: string[] = []
	let frame = switched ? 'test' : 'main'
	const browser = {
		execute: vi.fn(async (_fn: any, ...args: any[]) => {
			calls.push(`execute:${frame}:${args.length}`)
			if (args.length === 0) return { width: 1500, height: 1000 }
			if (args.length === 2) return { prev: 'prev-style', viewport: { width: 800, height: 600 } }
			return undefined
		}),
		saveScreenshot: vi.fn(async () => void calls.push(`shot:${frame}`)),
	}
	const provider = {
		name: 'webdriverio',
		isIframeSwitched: () => frame === 'test',
		switchToTestFrame: vi.fn(async () => {
			frame = 'test'
		}),
		switchToMainFrame: vi.fn(async () => {
			frame = 'main'
		}),
		setViewport: vi.fn(async (size: { width: number; height: number }) => {
			calls.push(`viewport:${size.width}x${size.height}`)
		}),
	}
	return { api: webdriverio({ browser, provider } as any), browser, provider, calls, frame: () => frame }
}

it('grows the iframe and the viewport to the content for fullPage, then restores them', async () => {
	const { api, browser, calls, frame } = setupFullPage()
	await api.takePageScreenshot('/root', 'a.png', { fullPage: true })
	expect(calls).toEqual([
		'execute:test:0',
		'execute:main:2',
		'viewport:1500x1000',
		'shot:main',
		'viewport:800x600',
		'execute:main:1',
	])
	expect(browser.saveScreenshot).toHaveBeenCalledWith('a.png')
	expect(frame()).toBe('test')
})

it('returns to the main frame when it started there', async () => {
	const { api, frame } = setupFullPage({ switched: false })
	await api.takePageScreenshot('/root', 'a.png', { fullPage: true })
	expect(frame()).toBe('main')
})

it('restores the viewport and the frame when the fullPage screenshot fails', async () => {
	const { api, browser, calls, frame } = setupFullPage()
	browser.saveScreenshot.mockRejectedValueOnce(new Error('boom'))
	await expect(api.takePageScreenshot('/root', 'a.png', { fullPage: true })).rejects.toThrow('boom')
	expect(calls.slice(-2)).toEqual(['viewport:800x600', 'execute:main:1'])
	expect(frame()).toBe('test')
})

it('falls back to a plain screenshot when the provider cannot switch frames', async () => {
	const { api, browser } = setup()
	await api.takePageScreenshot('/root', 'a.png', { fullPage: true })
	expect(browser.saveScreenshot).toHaveBeenCalledWith('a.png')
	expect(browser.execute).not.toHaveBeenCalled()
})
