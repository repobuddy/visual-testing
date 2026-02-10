import { expect, it } from 'vitest'
import type { StorybookViewport, ViewportSize } from './viewport.ts'

it('StorybookViewport type allows value and isRotated', () => {
	const v: StorybookViewport = { value: 'mobile2', isRotated: false }
	expect(v.value).toBe('mobile2')
	expect(v.isRotated).toBe(false)
})

it('ViewportSize type has width and height', () => {
	const s: ViewportSize = { width: 414, height: 896 }
	expect(s.width).toBe(414)
	expect(s.height).toBe(896)
})
