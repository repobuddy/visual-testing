import { getMaxSize } from '../shared/get_max_size.ts'
import { isSameSize } from '../shared/is_same_size.ts'
import { createImageResizer } from './image_resizer.ts'

export function alignImagesToSameSize(image1: ImageData, image2: ImageData): [image1: ImageData, image2: ImageData] {
	if (isSameSize(image1, image2)) return [image1, image2] as const

	const size = getMaxSize(image1, image2)
	const resize = createImageResizer(size)
	return [resize(image1), resize(image2)] as const
}
