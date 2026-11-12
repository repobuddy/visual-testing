import { it } from 'vitest'
import { render } from 'vitest-browser-react'
import { UNI_PNG_BASE64, UNI_PNG_URL } from '../../../testing/constants.ts'
import { toDataURL, toImageData } from './image_data.ts'

it('complete roundtrip conversion', async () => {
	const { getByTestId } = await render(
		<div>
			<img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
			<canvas data-testid="canvas" width={128} height={128} />
			<img data-testid="img" width={128} height={128} />
		</div>,
	)
	const c = getByTestId('canvas').element() as HTMLCanvasElement
	const ctx = c.getContext('2d')!

	const imageData = await toImageData(UNI_PNG_BASE64)
	ctx.putImageData(imageData, 0, 0)
	const dataURL = await toDataURL(imageData)

	const img = getByTestId('img').element() as HTMLImageElement
	img.src = dataURL
})

it('throws an error if the input is not an image', async ({ expect }) => {
	const error = await toImageData('something').catch((e) => e)
	expect(error).toBeInstanceOf(Error)
	expect(error.message).toBe('Failed to load image')
	expect(error.cause).toBeDefined()
})

it('decodes the same pixels as an image element', async ({ expect }) => {
	const img = new Image()
	img.src = `data:image/png;base64,${UNI_PNG_BASE64}`
	await img.decode()
	const canvas = document.createElement('canvas')
	canvas.width = img.width
	canvas.height = img.height
	const ctx = canvas.getContext('2d')!
	ctx.drawImage(img, 0, 0)
	const expected = ctx.getImageData(0, 0, canvas.width, canvas.height)

	const actual = await toImageData(UNI_PNG_BASE64)
	expect(actual.width).toBe(expected.width)
	expect(actual.height).toBe(expected.height)
	expect(actual.data).toEqual(expected.data)
})
