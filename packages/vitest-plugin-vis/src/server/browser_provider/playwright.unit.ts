import { expect, it, vi } from 'vitest'
import { playwright } from './playwright.ts'

function setup({ viewport = { width: 800, height: 600 } as { width: number; height: number } | null } = {}) {
	const screenshot = vi.fn(async () => Buffer.from(''))
	const container = { offsetWidth: 800, offsetHeight: 600, style: { cssText: 'width: 800px;' } as any }
	const contentDocument = { documentElement: { scrollWidth: 1500, scrollHeight: 1000 } }
	const el = { parentElement: container, contentDocument }
	const owner = {
		screenshot,
		evaluate: vi.fn(async (fn: (el: any, arg: any) => any, arg: any) => fn(el, arg)),
	}
	const iframe = { locator: vi.fn((s: string) => ({ s, screenshot })), owner: () => owner }
	const page = {
		screenshot: vi.fn(async () => Buffer.from('')),
		viewportSize: vi.fn(() => viewport),
		setViewportSize: vi.fn(async () => {}),
	}
	return { api: playwright({ page, iframe } as any), iframe, page, owner, container, screenshot }
}

it('passes mask locators and color to the subject screenshot', async () => {
	const { api, screenshot } = setup()
	await api.takeScreenshot('/root', 'a.png', 'body', { mask: ['.t'], maskColor: 'red', timeout: 1 })
	const arg = (screenshot.mock.calls[0] as any)[0]
	expect(arg.mask).toEqual([{ s: '.t', screenshot }])
	expect(arg.maskColor).toBe('red')
	expect(arg.timeout).toBe(1)
})

it('captures the test iframe instead of the runner page', async () => {
	const { api, page, screenshot } = setup()
	await api.takePageScreenshot('/root', 'a.png', { mask: ['.t'] })
	expect(page.screenshot).not.toHaveBeenCalled()
	const arg = (screenshot.mock.calls[0] as any)[0]
	expect(arg.mask).toHaveLength(1)
	expect(arg).not.toHaveProperty('fullPage')
	expect(arg).not.toHaveProperty('maskColor')
})

it('does not set mask when none is given', async () => {
	const { api, screenshot } = setup()
	await api.takePageScreenshot('/root', 'a.png', {})
	expect((screenshot.mock.calls[0] as any)[0]).not.toHaveProperty('mask')
})

it('keeps the viewport size when fullPage is not set', async () => {
	const { api, page, container } = setup()
	await api.takePageScreenshot('/root', 'a.png', {})
	expect(page.setViewportSize).not.toHaveBeenCalled()
	expect(container.style.cssText).toBe('width: 800px;')
})

it('grows the iframe and the viewport to the content for fullPage, then restores them', async () => {
	const { api, page, container, screenshot } = setup()
	screenshot.mockImplementationOnce(async () => {
		expect(container.style.width).toBe('1500px')
		expect(container.style.height).toBe('1000px')
		expect(container.style.transform).toBe('none')
		return Buffer.from('')
	})
	await api.takePageScreenshot('/root', 'a.png', { fullPage: true })
	expect(page.setViewportSize.mock.calls).toEqual([[{ width: 1500, height: 1000 }], [{ width: 800, height: 600 }]])
	expect(container.style.cssText).toBe('width: 800px;')
})

it('restores the state when the screenshot fails', async () => {
	const { api, page, container, screenshot } = setup()
	screenshot.mockRejectedValueOnce(new Error('boom'))
	await expect(api.takePageScreenshot('/root', 'a.png', { fullPage: true })).rejects.toThrow('boom')
	expect(page.setViewportSize).toHaveBeenLastCalledWith({ width: 800, height: 600 })
	expect(container.style.cssText).toBe('width: 800px;')
})

it('does not change the viewport when the page has none', async () => {
	const { api, page } = setup({ viewport: null })
	await api.takePageScreenshot('/root', 'a.png', { fullPage: true })
	expect(page.setViewportSize).not.toHaveBeenCalled()
})
