import { type ExpectStatic, it } from 'vitest'
import { UNI_PNG_BASE64 } from '../testing.ts'
import { toImageData } from './image_data.ts'
import { createImageResizer, createImageResizer2 } from './image_resizer.ts'

it('returns the same image if no resize is needed', async ({ expect }) => {
	const image = await toImageData(UNI_PNG_BASE64)
	let result = await createImageResizer(image)(image)
	expect(result).toBe(image)
	result = await createImageResizer2(image)(image)
	expect(result).toBe(image)
})

it('takes less than 200ms to resize 16 times', async ({ expect }) => {
	await shouldResizeWithin200ms(expect, createImageResizer, await toImageData(UNI_PNG_BASE64), 4, 1)
})

it('takes less than 200ms to resize 16 times (createImageResizer2)', async ({ expect }) => {
	await shouldResizeWithin200ms(expect, createImageResizer2, await toImageData(UNI_PNG_BASE64), 4, 1)
})

async function shouldResizeWithin200ms(
	expect: ExpectStatic,
	fn: typeof createImageResizer,
	image: ImageData,
	factor: number,
	length: number,
) {
	const startTime = Date.now()
	const resize = fn({ width: image.width * factor, height: image.height * factor })
	await Promise.all(Array.from({ length }).map(async () => resize(image)))
	const endTime = Date.now()
	const executionTime = endTime - startTime
	expect(executionTime / length).toBeLessThan(200)
}
