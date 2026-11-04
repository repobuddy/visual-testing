import { expect, it } from 'vitest'
import { normalizeMask, normalizeMaskOptions } from './mask.ts'

it('returns undefined when there is no mask', () => {
	expect(normalizeMask(undefined)).toBeUndefined()
	expect(normalizeMaskOptions(undefined)).toBeUndefined()
	const options: { mask?: undefined; timeout: number } = { timeout: 1 }
	expect(normalizeMaskOptions(options)).toBe(options)
})

it('keeps selectors and converts locators', () => {
	expect(normalizeMask(['.a', { selector: '[data-testid=b]' }])).toEqual(['.a', '[data-testid=b]'])
})

it('converts elements to css selectors', () => {
	const el = document.createElement('div')
	el.id = 'masked'
	document.body.appendChild(el)
	try {
		expect(normalizeMask([el])).toEqual([expect.stringContaining('#masked')])
	} finally {
		el.remove()
	}
})

it('throws on an unsupported entry', () => {
	expect(() => normalizeMask([1 as any])).toThrow("'mask' expects each entry")
	expect(() => normalizeMask('a' as any)).toThrow("'mask' must be an array")
})

it('converts the mask and keeps other options', () => {
	expect(normalizeMaskOptions({ mask: [{ selector: '.x' }], maskColor: 'red', timeout: 5 } as any)).toEqual({
		mask: ['.x'],
		maskColor: 'red',
		timeout: 5,
	})
})
