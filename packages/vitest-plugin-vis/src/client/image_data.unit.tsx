import { it } from 'vitest'
import { render } from 'vitest-browser-react'
import { UNI_PNG_BASE64, UNI_PNG_URL } from '../testing.ts'
import { toDataURL, toImageData } from './image_data.ts'

it('complete roundtrip conversion', async () => {
	const { getByTestId } = render(
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
	await expect(toImageData('something')).rejects.toThrowError()
})
