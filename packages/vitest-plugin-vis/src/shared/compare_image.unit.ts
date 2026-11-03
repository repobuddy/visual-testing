import { describe, it } from 'vitest'
import { compareImage, getChangedMask } from './compare_image.ts'

function createImage(width: number, height: number, gray: number) {
	const data = new Uint8ClampedArray(width * height * 4)
	for (let i = 0; i < data.length; i += 4) data.set([gray, gray, gray, 255], i)
	return data
}

describe('getChangedMask', () => {
	it('marks the pixels pixelmatch counts as different', ({ expect }) => {
		const baseline = createImage(4, 4, 255)
		const result = createImage(4, 4, 255)
		result.set([0, 0, 0, 255], (1 * 4 + 2) * 4)
		const diff = new Uint8ClampedArray(baseline.length)
		compareImage(baseline, result, diff, 4, 4)

		const mask = getChangedMask(baseline, result, diff, 4, 4)

		expect(Array.from(mask)).toEqual([0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0])
	})

	it('applies the SSIM threshold to the SSIM diff', ({ expect }) => {
		const width = 32
		const baseline = createImage(width, width, 255)
		const result = createImage(width, width, 255)
		for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) result.set([0, 0, 0, 255], (y * width + x) * 4)
		const diff = new Uint8ClampedArray(baseline.length)
		compareImage(baseline, result, diff, width, width, { comparisonMethod: 'ssim' })

		const mask = getChangedMask(baseline, result, diff, width, width, { comparisonMethod: 'ssim' })

		expect(mask[0]).toBe(1)
		expect(mask[width * width - 1]).toBe(0)
	})
})

describe('compareImage() failure threshold', () => {
	function run(options?: Parameters<typeof compareImage>[5]) {
		const baseline = createImage(10, 10, 255)
		const result = createImage(10, 10, 255)
		// 5 differing pixels out of 100
		for (let x = 0; x < 5; x++) result.set([0, 0, 0, 255], x * 4)
		return compareImage(baseline, result, new Uint8ClampedArray(baseline.length), 10, 10, options)
	}

	it('fails on any difference by default (pixel-perfect)', ({ expect }) => {
		expect(run()).toEqual({ pass: false, diffAmount: 5 })
	})

	it('measures the threshold in pixels by default', ({ expect }) => {
		expect(run({ failureThreshold: 4 }).pass).toBe(false)
		expect(run({ failureThreshold: 5 }).pass).toBe(true)
	})

	it('measures the threshold as a percentage with failureThresholdType: percent', ({ expect }) => {
		expect(run({ failureThreshold: 4, failureThresholdType: 'percent' })).toEqual({ pass: false, diffAmount: 5 })
		expect(run({ failureThreshold: 5, failureThresholdType: 'percent' }).pass).toBe(true)
	})
})

describe('compareImage() comparison method', () => {
	it('uses pixel comparison by default and ssim when requested', ({ expect }) => {
		const width = 32
		const baseline = createImage(width, width, 255)
		const result = createImage(width, width, 255)
		for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) result.set([0, 0, 0, 255], (y * width + x) * 4)
		const pixel = compareImage(baseline, result, new Uint8ClampedArray(baseline.length), width, width)
		const ssim = compareImage(baseline, result, new Uint8ClampedArray(baseline.length), width, width, {
			comparisonMethod: 'ssim',
		})
		expect(pixel.diffAmount).toBe(64)
		expect(ssim.diffAmount).not.toBe(64)
	})
})
