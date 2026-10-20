/**
 * A rectangular area of an image, in pixels.
 */
export type ChangedRegion = {
	x: number
	y: number
	width: number
	height: number
}

/**
 * How far, in pixels, the changed-pixel mask grows before it is split into regions.
 * Changes closer than twice this distance end up in the same region.
 */
export const CHANGED_REGION_MARGIN = 16

/**
 * Finds the areas of an image that changed.
 *
 * The changed-pixel mask grows by `margin` pixels in every direction,
 * and each connected area becomes one box.
 * Boxes that overlap are merged.
 *
 * @param mask One byte per pixel; non-zero marks a changed pixel.
 * @returns The boxes, sorted top to bottom, then left to right.
 */
export function findChangedRegions(
	mask: ArrayLike<number>,
	width: number,
	height: number,
	margin = CHANGED_REGION_MARGIN,
): ChangedRegion[] {
	const grown = growMask(mask, width, height, margin)
	return mergeOverlappingRegions(labelRegions(grown, width, height))
}

/**
 * Grows the mask by `margin` pixels in every direction (a square dilation),
 * in two passes so the cost does not depend on the margin.
 */
function growMask(mask: ArrayLike<number>, width: number, height: number, margin: number) {
	const horizontal = new Uint8Array(width * height)
	const rowCounts = new Int32Array(width + 1)
	for (let y = 0; y < height; y++) {
		const row = y * width
		for (let x = 0; x < width; x++) rowCounts[x + 1] = rowCounts[x]! + (mask[row + x] ? 1 : 0)
		if (rowCounts[width] === 0) continue
		for (let x = 0; x < width; x++) {
			const from = Math.max(0, x - margin)
			const to = Math.min(width, x + margin + 1)
			if (rowCounts[to]! - rowCounts[from]! > 0) horizontal[row + x] = 1
		}
	}

	const grown = new Uint8Array(width * height)
	const columnCounts = new Int32Array(height + 1)
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) columnCounts[y + 1] = columnCounts[y]! + horizontal[y * width + x]!
		if (columnCounts[height] === 0) continue
		for (let y = 0; y < height; y++) {
			const from = Math.max(0, y - margin)
			const to = Math.min(height, y + margin + 1)
			if (columnCounts[to]! - columnCounts[from]! > 0) grown[y * width + x] = 1
		}
	}
	return grown
}

/**
 * Returns the bounding box of each 4-connected area of the mask.
 */
function labelRegions(mask: Uint8Array, width: number, height: number) {
	const visited = new Uint8Array(width * height)
	const stack = new Int32Array(width * height)
	const regions: ChangedRegion[] = []
	for (let start = 0; start < mask.length; start++) {
		if (!mask[start] || visited[start]) continue
		let minX = width
		let minY = height
		let maxX = -1
		let maxY = -1
		let top = 0
		stack[top++] = start
		visited[start] = 1
		while (top > 0) {
			const i = stack[--top]!
			const x = i % width
			const y = (i - x) / width
			if (x < minX) minX = x
			if (x > maxX) maxX = x
			if (y < minY) minY = y
			if (y > maxY) maxY = y
			if (x > 0 && mask[i - 1] && !visited[i - 1]) {
				visited[i - 1] = 1
				stack[top++] = i - 1
			}
			if (x < width - 1 && mask[i + 1] && !visited[i + 1]) {
				visited[i + 1] = 1
				stack[top++] = i + 1
			}
			if (y > 0 && mask[i - width] && !visited[i - width]) {
				visited[i - width] = 1
				stack[top++] = i - width
			}
			if (y < height - 1 && mask[i + width] && !visited[i + width]) {
				visited[i + width] = 1
				stack[top++] = i + width
			}
		}
		regions.push({ x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
	}
	return regions
}

/**
 * Merges boxes that overlap until no two boxes overlap.
 *
 * @returns The boxes, sorted top to bottom, then left to right.
 */
export function mergeOverlappingRegions(regions: ChangedRegion[]): ChangedRegion[] {
	const result = regions.map((r) => ({ ...r }))
	let merged = true
	while (merged) {
		merged = false
		for (let i = 0; i < result.length; i++) {
			for (let j = i + 1; j < result.length; j++) {
				const a = result[i]!
				const b = result[j]!
				if (!overlaps(a, b)) continue
				const x = Math.min(a.x, b.x)
				const y = Math.min(a.y, b.y)
				result[i] = {
					x,
					y,
					width: Math.max(a.x + a.width, b.x + b.width) - x,
					height: Math.max(a.y + a.height, b.y + b.height) - y,
				}
				result.splice(j, 1)
				j = i
				merged = true
			}
		}
	}
	return result.sort((a, b) => a.y - b.y || a.x - b.x)
}

function overlaps(a: ChangedRegion, b: ChangedRegion) {
	return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height
}

/**
 * Describes the regions for a failure message,
 * e.g. `2 regions: 106x37 at (0,0), 40x20 at (300,512)`.
 */
export function formatChangedRegions(regions: ChangedRegion[], maxListed = 5) {
	if (regions.length === 0) return 'no region found'
	const listed = regions
		.slice(0, maxListed)
		.map((r) => `${r.width}x${r.height} at (${r.x},${r.y})`)
		.join(', ')
	const more = regions.length > maxListed ? `, and ${regions.length - maxListed} more` : ''
	return `${regions.length} ${regions.length === 1 ? 'region' : 'regions'}: ${listed}${more}`
}
