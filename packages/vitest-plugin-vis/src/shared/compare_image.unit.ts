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
