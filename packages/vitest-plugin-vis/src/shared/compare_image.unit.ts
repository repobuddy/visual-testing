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

describe('compareImage diffOptions', () => {
	const width = 32
	function setup() {
		const baseline = createImage(width, width, 255)
		const result = createImage(width, width, 255)
		for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) result.set([200, 200, 200, 255], (y * width + x) * 4)
		return { baseline, result, output: new Uint8ClampedArray(baseline.length) }
	}

	it('passes the pixel diffOptions to pixelmatch: threshold', ({ expect }) => {
		const { baseline, result, output } = setup()
		expect(compareImage(baseline, result, output, width, width).diffAmount).toBe(64)
		expect(compareImage(baseline, result, output, width, width, { diffOptions: { threshold: 0.5 } }).diffAmount).toBe(0)
	})

	it('passes the pixel diffOptions to pixelmatch: diffColor', ({ expect }) => {
		const { baseline, result, output } = setup()
		compareImage(baseline, result, output, width, width)
		expect(Array.from(output.subarray(0, 4))).toEqual([255, 0, 0, 255])

		compareImage(baseline, result, output, width, width, { diffOptions: { diffColor: [0, 0, 255] } })
		expect(Array.from(output.subarray(0, 4))).toEqual([0, 0, 255, 255])
	})

	it('passes the pixel diffOptions to pixelmatch: diffMask', ({ expect }) => {
		const { baseline, result, output } = setup()
		compareImage(baseline, result, output, width, width, { diffOptions: { diffMask: true } })
		// unchanged pixels are transparent
		expect(output[(width * width - 1) * 4 + 3]).toBe(0)
	})

	it('uses the bezkrovny ssim variant by default', ({ expect }) => {
		const { baseline, result, output } = setup()
		const options = { comparisonMethod: 'ssim' } as const
		const byDefault = compareImage(baseline, result, output, width, width, options).diffAmount
		const bezkrovny = compareImage(baseline, result, output, width, width, {
			...options,
			diffOptions: { ssim: 'bezkrovny' },
		}).diffAmount
		const weber = compareImage(baseline, result, output, width, width, {
			...options,
			diffOptions: { ssim: 'weber' },
		}).diffAmount
		expect(byDefault).toBe(bezkrovny)
		expect(byDefault).not.toBe(weber)
	})
})
