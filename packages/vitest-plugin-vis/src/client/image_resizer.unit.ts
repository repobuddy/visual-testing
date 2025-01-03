import { expect, it } from 'vitest'
import { UNI_PNG_BASE64 } from '../testing.ts'
import { toImageData } from './image_data.ts'
import { createImageResizer, createImageResizer2 } from './image_resizer.ts'

it('returns the same image if no resize is needed', async () => {
	const image = await toImageData(UNI_PNG_BASE64)
	let result = await createImageResizer(image)(image)
	expect(result).toBe(image)
	result = await createImageResizer2(image)(image)
	expect(result).toBe(image)
})

it('takes less than 200ms to resize 16 times', async () => {
	await shouldResizeWithin200ms(createImageResizer, await toImageData(UNI_PNG_BASE64), 4, 1)
})

it('takes less than 200ms to resize 16 times (createImageResizer2)', async () => {
	await shouldResizeWithin200ms(createImageResizer2, await toImageData(UNI_PNG_BASE64), 4, 1)
})

async function shouldResizeWithin200ms(
	fn: typeof createImageResizer,
	image: ImageData,
	factor: number,
	length: number,
) {
	const startTime = new Date().getTime()
	const resize = fn({ width: image.width * factor, height: image.height * factor })
	await Promise.all(Array.from({ length }).map(async () => resize(image)))
	const endTime = new Date().getTime()
	const executionTime = endTime - startTime
	expect(executionTime / length).toBeLessThan(200)
}
