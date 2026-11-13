import { describe, it } from 'vitest'
import {
	createFullReviewImage,
	createReviewImage,
	getReviewImageLayout,
	getReviewImageSkipReason,
	type PixelImage,
	REVIEW_IMAGE_MAX_EDGE,
	REVIEW_IMAGE_MAX_REGIONS,
} from './review_image.ts'

function createImage(width: number, height: number, rgba: [number, number, number, number]): PixelImage {
	const data = new Uint8ClampedArray(width * height * 4)
	for (let i = 0; i < data.length; i += 4) data.set(rgba, i)
	return { data, width, height }
}

function pixelAt(image: PixelImage, x: number, y: number) {
	const i = (y * image.width + x) * 4
	return Array.from(image.data.subarray(i, i + 4))
}

describe('getReviewImageSkipReason', () => {
	const size = { width: 100, height: 100 }

	it('returns undefined when cropping helps', ({ expect }) => {
		expect(
			getReviewImageSkipReason({ baseline: size, result: size, regions: [{ x: 0, y: 0, width: 10, height: 10 }] }),
		).toBeUndefined()
	})

	it('skips when the image size changed', ({ expect }) => {
		expect(
			getReviewImageSkipReason({
				baseline: size,
				result: { width: 100, height: 120 },
				regions: [{ x: 0, y: 0, width: 10, height: 10 }],
			}),
		).toBe('the image size changed')
	})

	it('skips when no region is found', ({ expect }) => {
		expect(getReviewImageSkipReason({ baseline: size, result: size, regions: [] })).toBe('no changed region found')
	})

	it('skips when there are too many regions', ({ expect }) => {
		const regions = Array.from({ length: REVIEW_IMAGE_MAX_REGIONS + 1 }, (_, i) => ({
			x: i * 10,
			y: 0,
			width: 1,
			height: 1,
		}))
		expect(getReviewImageSkipReason({ baseline: size, result: size, regions })).toBe(
			`${REVIEW_IMAGE_MAX_REGIONS + 1} regions, more than ${REVIEW_IMAGE_MAX_REGIONS}`,
		)
	})

	it('skips when the regions cover most of the image', ({ expect }) => {
		expect(
			getReviewImageSkipReason({ baseline: size, result: size, regions: [{ x: 0, y: 0, width: 100, height: 60 }] }),
		).toBe('the regions cover 60% of the image')
	})
})

describe('createReviewImage', () => {
	it('places the crops of a narrow region left to right: baseline, result, diff', ({ expect }) => {
		const baseline = createImage(20, 20, [0, 0, 255, 255])
		const result = createImage(20, 20, [0, 255, 0, 255])
		const mask = new Uint8Array(400)
		mask[5 * 20 + 5] = 1

		const review = createReviewImage(baseline, result, mask, [{ x: 4, y: 4, width: 3, height: 5 }])

		expect(review.width).toBe(3 * 3 + 4 * 2)
		expect(review.height).toBe(5)
		expect(pixelAt(review, 0, 0)).toEqual([0, 0, 255, 255])
		expect(pixelAt(review, 3, 0)).toEqual([128, 128, 128, 255])
		expect(pixelAt(review, 7, 0)).toEqual([0, 255, 0, 255])
		// the changed pixel at (5,5) is at (1,1) of the diff crop
		expect(pixelAt(review, 14 + 1, 1)).toEqual([255, 0, 0, 255])
	})

	it('shows unchanged pixels of the diff crop in grayscale at full contrast', ({ expect }) => {
		const gray = createImage(4, 4, [100, 100, 100, 255])
		const review = createReviewImage(gray, gray, new Uint8Array(16), [{ x: 0, y: 0, width: 1, height: 1 }])
		expect(pixelAt(review, 10, 0)).toEqual([100, 100, 100, 255])
	})

	it('places the crops of a wide region top to bottom', ({ expect }) => {
		const image = createImage(20, 20, [0, 0, 0, 255])
		const review = createReviewImage(image, image, new Uint8Array(400), [{ x: 0, y: 0, width: 10, height: 2 }])
		expect(review.width).toBe(10)
		expect(review.height).toBe(2 * 3 + 4 * 2)
	})

	it('places regions top to bottom', ({ expect }) => {
		const image = createImage(20, 20, [0, 0, 0, 255])
		const review = createReviewImage(image, image, new Uint8Array(400), [
			{ x: 0, y: 0, width: 2, height: 3 },
			{ x: 10, y: 10, width: 1, height: 4 },
		])
		expect(review.width).toBe(2 * 3 + 4 * 2)
		expect(review.height).toBe(3 + 16 + 4)
	})

	it('scales the image down to fit the maximum edge', ({ expect }) => {
		const width = 3000
		const image = createImage(width, 10, [0, 0, 0, 255])
		const review = createReviewImage(image, image, new Uint8Array(width * 10), [{ x: 0, y: 0, width, height: 10 }])
		expect(review.width).toBe(REVIEW_IMAGE_MAX_EDGE)
		expect(review.height).toBe(Math.round(((10 * 3 + 4 * 2) * REVIEW_IMAGE_MAX_EDGE) / width))
	})
})

describe('getReviewImageSkipReason coverage limit', () => {
	const size = { width: 100, height: 100 }

	it('does not skip when the regions cover exactly half of the image', ({ expect }) => {
		expect(
			getReviewImageSkipReason({ baseline: size, result: size, regions: [{ x: 0, y: 0, width: 100, height: 50 }] }),
		).toBeUndefined()
	})

	it('does not skip with exactly 5 regions', ({ expect }) => {
		const regions = Array.from({ length: 5 }, (_, i) => ({ x: i * 10, y: 0, width: 1, height: 1 }))
		expect(getReviewImageSkipReason({ baseline: size, result: size, regions })).toBeUndefined()
	})
})

describe('getReviewImageLayout', () => {
	const size = { width: 100, height: 100 }
	const oneRegion = [{ x: 0, y: 0, width: 10, height: 10 }]

	it('crops to the regions by default when cropping helps', ({ expect }) => {
		expect(getReviewImageLayout({ baseline: size, result: size, regions: oneRegion })).toEqual({ layout: 'regions' })
		expect(getReviewImageLayout({ reviewImage: true, baseline: size, result: size, regions: oneRegion })).toEqual({
			layout: 'regions',
		})
	})

	it('falls back to the whole image when the image size changed', ({ expect }) => {
		expect(getReviewImageLayout({ baseline: size, result: { width: 100, height: 120 }, regions: oneRegion })).toEqual({
			layout: 'full',
			reason: 'the image size changed',
		})
	})

	it('falls back to the whole image when no region is found', ({ expect }) => {
		expect(getReviewImageLayout({ baseline: size, result: size, regions: [] })).toEqual({
			layout: 'full',
			reason: 'no changed region found',
		})
	})

	it('falls back to the whole image when there are too many regions', ({ expect }) => {
		const regions = Array.from({ length: REVIEW_IMAGE_MAX_REGIONS + 1 }, (_, i) => ({
			x: i * 10,
			y: 0,
			width: 1,
			height: 1,
		}))
		expect(getReviewImageLayout({ baseline: size, result: size, regions })).toEqual({
			layout: 'full',
			reason: `${REVIEW_IMAGE_MAX_REGIONS + 1} regions, more than ${REVIEW_IMAGE_MAX_REGIONS}`,
		})
	})

	it('falls back to the whole image when the regions cover most of the image', ({ expect }) => {
		expect(
			getReviewImageLayout({ baseline: size, result: size, regions: [{ x: 0, y: 0, width: 100, height: 60 }] }),
		).toEqual({ layout: 'full', reason: 'the regions cover 60% of the image' })
	})

	it('always uses the whole image with `full`', ({ expect }) => {
		expect(getReviewImageLayout({ reviewImage: 'full', baseline: size, result: size, regions: oneRegion })).toEqual({
			layout: 'full',
		})
		expect(getReviewImageLayout({ reviewImage: 'full', baseline: size, result: size, regions: [] })).toEqual({
			layout: 'full',
		})
	})

	it('writes none with `false`', ({ expect }) => {
		expect(
			getReviewImageLayout({ reviewImage: false, baseline: size, result: size, regions: oneRegion }),
		).toBeUndefined()
		expect(getReviewImageLayout({ reviewImage: false, baseline: size, result: size, regions: [] })).toBeUndefined()
	})
})

describe('createFullReviewImage', () => {
	it('places a narrow image left to right: baseline, result, diff', ({ expect }) => {
		const baseline = createImage(4, 6, [0, 0, 255, 255])
		const result = createImage(4, 6, [0, 255, 0, 255])
		const mask = new Uint8Array(24)
		mask[1 * 4 + 2] = 1

		const review = createFullReviewImage(baseline, result, mask, createImage(4, 6, [0, 0, 0, 0]))

		expect(review.width).toBe(4 * 3 + 4 * 2)
		expect(review.height).toBe(6)
		expect(pixelAt(review, 0, 0)).toEqual([0, 0, 255, 255])
		expect(pixelAt(review, 4, 0)).toEqual([128, 128, 128, 255])
		expect(pixelAt(review, 8, 0)).toEqual([0, 255, 0, 255])
		// the changed pixel at (2,1) is at (2,1) of the diff
		expect(pixelAt(review, 16 + 2, 1)).toEqual([255, 0, 0, 255])
		expect(pixelAt(review, 16, 0)).not.toEqual([255, 0, 0, 255])
	})

	it('places a wide image top to bottom', ({ expect }) => {
		const image = createImage(10, 2, [0, 0, 0, 255])
		const review = createFullReviewImage(image, image, new Uint8Array(20).fill(1), image)
		expect(review.width).toBe(10)
		expect(review.height).toBe(2 * 3 + 4 * 2)
	})

	it('shows the comparison output over white when no pixel is marked changed', ({ expect }) => {
		const image = createImage(2, 2, [0, 0, 0, 255])
		const diff = createImage(2, 2, [255, 0, 0, 0])
		diff.data.set([255, 0, 0, 51], 0)
		const review = createFullReviewImage(image, image, new Uint8Array(4), diff)
		expect(pixelAt(review, 12, 0)).toEqual([255, 204, 204, 255])
		expect(pixelAt(review, 13, 0)).toEqual([255, 255, 255, 255])
	})

	it('scales the image down to fit the maximum edge', ({ expect }) => {
		const width = 3000
		const image = createImage(width, 10, [0, 0, 0, 255])
		const review = createFullReviewImage(image, image, new Uint8Array(width * 10), image)
		expect(review.width).toBe(REVIEW_IMAGE_MAX_EDGE)
		expect(review.height).toBe(Math.round(((10 * 3 + 4 * 2) * REVIEW_IMAGE_MAX_EDGE) / width))
	})
})
