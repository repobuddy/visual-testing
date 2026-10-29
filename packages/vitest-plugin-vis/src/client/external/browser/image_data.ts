export async function toImageData(base64: string) {
	// `createImageBitmap` + `close()` releases the decoded pixels right away.
	// `new Image()` + `drawImage` leaves a full-size decode in Chromium's image decode cache.
	let bitmap: ImageBitmap
	try {
		const blob = await (await fetch(`data:image/png;base64,${base64}`)).blob()
		bitmap = await createImageBitmap(blob)
	} catch (cause) {
		throw new Error('Failed to load image', { cause })
	}
	try {
		const canvas = document.createElement('canvas')
		canvas.width = bitmap.width
		canvas.height = bitmap.height
		const ctx = canvas.getContext('2d')!
		ctx.drawImage(bitmap, 0, 0)
		return ctx.getImageData(0, 0, canvas.width, canvas.height)
	} finally {
		bitmap.close()
	}
}
export async function toDataURL(imageData: ImageData) {
	const canvas = document.createElement('canvas')
	canvas.width = imageData.width
	canvas.height = imageData.height
	const ctx = canvas.getContext('2d')!
	ctx.putImageData(imageData, 0, 0)
	return new Promise<string>((resolve) => {
		canvas.toBlob((blob) => {
			const reader = new FileReader()
			reader.onload = () => {
				resolve(reader.result as string)
			}
			reader.readAsDataURL(blob!)
		})
	})
}
