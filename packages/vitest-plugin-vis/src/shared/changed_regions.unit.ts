import { describe, it } from 'vitest'
import { findChangedRegions, formatChangedRegions, mergeOverlappingRegions } from './changed_regions.ts'

function createMask(width: number, height: number, points: Array<[x: number, y: number]>) {
	const mask = new Uint8Array(width * height)
	for (const [x, y] of points) mask[y * width + x] = 1
	return mask
}

describe('findChangedRegions', () => {
	it('returns no region when nothing changed', ({ expect }) => {
		expect(findChangedRegions(new Uint8Array(100), 10, 10)).toEqual([])
	})

	it('grows a changed pixel by the margin, clamped to the image', ({ expect }) => {
		expect(findChangedRegions(createMask(100, 100, [[2, 50]]), 100, 100, 16)).toEqual([
			{ x: 0, y: 34, width: 19, height: 33 },
		])
	})

	it('keeps changes far apart as separate regions', ({ expect }) => {
		const mask = createMask(400, 600, [
			[10, 10],
			[300, 500],
		])
		expect(findChangedRegions(mask, 400, 600, 16)).toEqual([
			{ x: 0, y: 0, width: 27, height: 27 },
			{ x: 284, y: 484, width: 33, height: 33 },
		])
	})

	it('joins changes within twice the margin into one region', ({ expect }) => {
		const mask = createMask(200, 200, [
			[50, 50],
			[80, 50],
		])
		expect(findChangedRegions(mask, 200, 200, 16)).toEqual([{ x: 34, y: 34, width: 63, height: 33 }])
	})

	it('merges regions whose boxes overlap', ({ expect }) => {
		// an L shape and a dot inside its bounding box but not touching it
		const points: Array<[number, number]> = []
		for (let x = 0; x < 100; x++) points.push([x, 0])
		for (let y = 0; y < 100; y++) points.push([0, y])
		points.push([80, 80])
		expect(findChangedRegions(createMask(120, 120, points), 120, 120, 4)).toEqual([
			{ x: 0, y: 0, width: 104, height: 104 },
		])
	})
})

describe('mergeOverlappingRegions', () => {
	it('merges chains of overlapping regions', ({ expect }) => {
		expect(
			mergeOverlappingRegions([
				{ x: 0, y: 0, width: 10, height: 10 },
				{ x: 20, y: 0, width: 10, height: 10 },
				{ x: 5, y: 5, width: 20, height: 10 },
			]),
		).toEqual([{ x: 0, y: 0, width: 30, height: 15 }])
	})

	it('keeps regions that only touch', ({ expect }) => {
		expect(
			mergeOverlappingRegions([
				{ x: 10, y: 0, width: 10, height: 10 },
				{ x: 0, y: 0, width: 10, height: 10 },
			]),
		).toEqual([
			{ x: 0, y: 0, width: 10, height: 10 },
			{ x: 10, y: 0, width: 10, height: 10 },
		])
	})
})

describe('formatChangedRegions', () => {
	it('lists the regions', ({ expect }) => {
		expect(
			formatChangedRegions([
				{ x: 0, y: 0, width: 106, height: 37 },
				{ x: 300, y: 512, width: 40, height: 20 },
			]),
		).toBe('2 regions: 106x37 at (0,0), 40x20 at (300,512)')
	})

	it('uses the singular for one region', ({ expect }) => {
		expect(formatChangedRegions([{ x: 1, y: 2, width: 3, height: 4 }])).toBe('1 region: 3x4 at (1,2)')
	})

	it('says when no region is found', ({ expect }) => {
		expect(formatChangedRegions([])).toBe('no region found')
	})

	it('lists the first few regions and counts the rest', ({ expect }) => {
		const regions = Array.from({ length: 7 }, (_, i) => ({ x: i, y: 0, width: 1, height: 1 }))
		expect(formatChangedRegions(regions, 2)).toBe('7 regions: 1x1 at (0,0), 1x1 at (1,0), and 5 more')
	})
})
