import type { ChangedRegion } from './changed_regions.ts'

/**
 * Raw RGBA pixels, compatible with `ImageData`.
 */
export type PixelImage = {
	data: Uint8ClampedArray<ArrayBuffer>
	width: number
	height: number
}

/**
 * The longest edge of the review image, in pixels.
 */
export const REVIEW_IMAGE_MAX_EDGE = 2576

/**
 * The review image is skipped when there are more regions than this.
 */
export const REVIEW_IMAGE_MAX_REGIONS = 5

/**
 * The review image is skipped when the regions cover more than this share of the image.
 */
export const REVIEW_IMAGE_MAX_COVERAGE = 0.5

const CROP_GAP = 4
const REGION_GAP = 16
const GAP_COLOR = [128, 128, 128, 255] as const
const CHANGED_COLOR = [255, 0, 0, 255] as const

/**
 * Returns why a review image does not help, or `undefined` when it does.
 */
export function getReviewImageSkipReason({
	baseline,
	result,
	regions,
}: {
	baseline: { width: number; height: number }
	result: { width: number; height: number }
	regions: ChangedRegion[]
}) {
	if (baseline.width !== result.width || baseline.height !== result.height) return 'the image size changed'
	if (regions.length === 0) return 'no changed region found'
	if (regions.length > REVIEW_IMAGE_MAX_REGIONS)
		return `${regions.length} regions, more than ${REVIEW_IMAGE_MAX_REGIONS}`
	const area = regions.reduce((sum, r) => sum + r.width * r.height, 0)
	const coverage = area / (baseline.width * baseline.height)
	if (coverage > REVIEW_IMAGE_MAX_COVERAGE) return `the regions cover ${Math.round(coverage * 100)}% of the image`
	return undefined
}

/**
 * Creates one image that shows, for each region, the baseline crop, the result crop, and the diff crop.
 *
 * A wide region places its crops top to bottom, a narrow one left to right.
 * Regions are placed top to bottom.
 * The diff crop shows the baseline in grayscale at full contrast with the changed pixels in red.
 * The image is scaled down to fit {@link REVIEW_IMAGE_MAX_EDGE}.
 *
 * @param mask One byte per pixel of the baseline; non-zero marks a changed pixel.
 */
export function createReviewImage(
	baseline: PixelImage,
	result: PixelImage,
	mask: ArrayLike<number>,
	regions: ChangedRegion[],
): PixelImage {
	const panels = regions.map((region) => {
		const crops = [crop(baseline, region), crop(result, region), createDiffCrop(baseline, mask, region)]
		return region.width > region.height ? stack(crops, 'vertical', CROP_GAP) : stack(crops, 'horizontal', CROP_GAP)
	})
	return fitWithin(stack(panels, 'vertical', REGION_GAP), REVIEW_IMAGE_MAX_EDGE)
}

function crop(image: PixelImage, { x, y, width, height }: ChangedRegion): PixelImage {
	const data = new Uint8ClampedArray(width * height * 4)
	for (let row = 0; row < height; row++) {
		const start = ((y + row) * image.width + x) * 4
		data.set(image.data.subarray(start, start + width * 4), row * width * 4)
	}
	return { data, width, height }
}

function createDiffCrop(
	image: PixelImage,
	mask: ArrayLike<number>,
	{ x, y, width, height }: ChangedRegion,
): PixelImage {
	const data = new Uint8ClampedArray(width * height * 4)
	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			const i = (y + row) * image.width + x + col
			const pos = (row * width + col) * 4
			if (mask[i]) {
				data.set(CHANGED_COLOR, pos)
				continue
			}
			const src = i * 4
			const r = image.data[src]!
			const g = image.data[src + 1]!
			const b = image.data[src + 2]!
			const a = image.data[src + 3]!
			const luma = 0.29889531 * r + 0.58662247 * g + 0.11448223 * b
			// blend with white by the pixel's own alpha only, so the baseline is not faded
			const gray = 255 + ((luma - 255) * a) / 255
			data[pos] = gray
			data[pos + 1] = gray
			data[pos + 2] = gray
			data[pos + 3] = 255
		}
	}
	return { data, width, height }
}

function stack(images: PixelImage[], direction: 'horizontal' | 'vertical', gap: number): PixelImage {
	const horizontal = direction === 'horizontal'
	const gaps = gap * (images.length - 1)
	const width = horizontal
		? images.reduce((sum, image) => sum + image.width, gaps)
		: Math.max(...images.map((image) => image.width))
	const height = horizontal
		? Math.max(...images.map((image) => image.height))
		: images.reduce((sum, image) => sum + image.height, gaps)
	const data = new Uint8ClampedArray(width * height * 4)
	for (let i = 0; i < data.length; i += 4) data.set(GAP_COLOR, i)

	let offset = 0
	for (const image of images) {
		const x = horizontal ? offset : 0
		const y = horizontal ? 0 : offset
		for (let row = 0; row < image.height; row++) {
			data.set(image.data.subarray(row * image.width * 4, (row + 1) * image.width * 4), ((y + row) * width + x) * 4)
		}
		offset += (horizontal ? image.width : image.height) + gap
	}
	return { data, width, height }
}

/**
 * Scales the image down, averaging the pixels each target pixel covers,
 * so its longest edge is at most `maxEdge`.
 */
function fitWithin(image: PixelImage, maxEdge: number): PixelImage {
	const scale = maxEdge / Math.max(image.width, image.height)
	if (scale >= 1) return image

	const width = Math.max(1, Math.round(image.width * scale))
	const height = Math.max(1, Math.round(image.height * scale))
	const data = new Uint8ClampedArray(width * height * 4)
	for (let y = 0; y < height; y++) {
		const fromY = Math.floor((y * image.height) / height)
		const toY = Math.max(fromY + 1, Math.floor(((y + 1) * image.height) / height))
		for (let x = 0; x < width; x++) {
			const fromX = Math.floor((x * image.width) / width)
			const toX = Math.max(fromX + 1, Math.floor(((x + 1) * image.width) / width))
			let r = 0
			let g = 0
			let b = 0
			let a = 0
			for (let sy = fromY; sy < toY; sy++) {
				for (let sx = fromX; sx < toX; sx++) {
					const src = (sy * image.width + sx) * 4
					r += image.data[src]!
					g += image.data[src + 1]!
					b += image.data[src + 2]!
					a += image.data[src + 3]!
				}
			}
			const count = (toY - fromY) * (toX - fromX)
			const pos = (y * width + x) * 4
			data[pos] = r / count
			data[pos + 1] = g / count
			data[pos + 2] = b / count
			data[pos + 3] = a / count
		}
	}
	return { data, width, height }
}
