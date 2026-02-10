import { expect, it } from 'vitest'
import { resolveViewportToSize } from './viewport.ts'

it('resolves MINIMAL_VIEWPORTS ids (from storybook/viewport)', () => {
	expect(resolveViewportToSize({ value: 'mobile1', isRotated: false })).toEqual({
		width: 320,
		height: 568,
	})
	expect(resolveViewportToSize({ value: 'mobile2', isRotated: false })).toEqual({
		width: 414,
		height: 896,
	})
	expect(resolveViewportToSize({ value: 'tablet' })).toEqual({
		width: 834,
		height: 1112,
	})
	expect(resolveViewportToSize({ value: 'desktop' })).toEqual({
		width: 1280,
		height: 1024,
	})
})

it('resolves INITIAL_VIEWPORTS ids (from storybook/viewport)', () => {
	expect(resolveViewportToSize({ value: 'iphonex', isRotated: false })).toEqual({
		width: 375,
		height: 812,
	})
	expect(resolveViewportToSize({ value: 'ipad10p' })).toEqual({
		width: 834,
		height: 1112,
	})
})

it('swaps width/height when isRotated is true', () => {
	expect(resolveViewportToSize({ value: 'mobile2', isRotated: true })).toEqual({
		width: 896,
		height: 414,
	})
})

it('returns undefined for unknown viewport id', () => {
	expect(resolveViewportToSize({ value: 'unknown' })).toBeUndefined()
})

it('returns undefined when viewport is undefined or missing value', () => {
	expect(resolveViewportToSize(undefined)).toBeUndefined()
	expect(resolveViewportToSize({ value: '' })).toBeUndefined()
})
