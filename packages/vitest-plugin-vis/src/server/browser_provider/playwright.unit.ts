import { expect, it, vi } from 'vitest'
import { playwright } from './playwright.ts'

function setup() {
	const screenshot = vi.fn(async () => Buffer.from(''))
	const iframe = { locator: vi.fn((s: string) => ({ s, screenshot })) }
	const page = { screenshot: vi.fn(async () => Buffer.from('')) }
	return { api: playwright({ page, iframe } as any), iframe, page, screenshot }
}

it('passes mask locators and color to the subject screenshot', async () => {
	const { api, screenshot } = setup()
	await api.takeScreenshot('/root', 'a.png', 'body', { mask: ['.t'], maskColor: 'red', timeout: 1 })
	const arg = (screenshot.mock.calls[0] as any)[0]
	expect(arg.mask).toEqual([{ s: '.t', screenshot }])
	expect(arg.maskColor).toBe('red')
	expect(arg.timeout).toBe(1)
})

it('passes mask locators to the page screenshot', async () => {
	const { api, page } = setup()
	await api.takePageScreenshot('/root', 'a.png', { mask: ['.t'], fullPage: true })
	const arg = (page.screenshot.mock.calls[0] as any)[0]
	expect(arg.mask).toHaveLength(1)
	expect(arg.fullPage).toBe(true)
	expect(arg).not.toHaveProperty('maskColor')
})

it('does not set mask when none is given', async () => {
	const { api, page } = setup()
	await api.takePageScreenshot('/root', 'a.png', {})
	expect((page.screenshot.mock.calls[0] as any)[0]).not.toHaveProperty('mask')
})
