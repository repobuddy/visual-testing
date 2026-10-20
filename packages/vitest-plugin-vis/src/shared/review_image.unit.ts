import { describe, it } from 'vitest'
import {
	createReviewImage,
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
