export const createImageResizer =
	({ width, height }: { width: number; height: number }) =>
	(image: ImageData) => {
		if (image.width === width && image.height === height) {
			return image
		}
		const inArea = (x: number, y: number) => y <= image.height && x <= image.width
		const result = new ImageData(width, height, { colorSpace: image.colorSpace })

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const idx = (width * y + x) << 2
				if (inArea(x, y)) {
					const old = (image.width * y + x) << 2
					result.data[idx] = image.data[old]
					result.data[idx + 1] = image.data[old + 1]
					result.data[idx + 2] = image.data[old + 2]
					result.data[idx + 3] = image.data[old + 3]
				} else {
					result.data[idx] = 0
					result.data[idx + 1] = 0
					result.data[idx + 2] = 0
					result.data[idx + 3] = 64
				}
			}
		}

		return result
	}

// slower
export const createImageResizer2 =
	({ width, height }: { width: number; height: number }) =>
	(image: ImageData) => {
		if (image.width === width && image.height === height) {
			return image
		}
		const inArea = (x: number, y: number) => y <= image.height && x <= image.width
		const result = new ImageData(width, height, { colorSpace: image.colorSpace })

		const copyBytes = image.width * 4
		for (let y = 0; y < height; y++) {
			result.data.set(image.data.slice(y * image.width, copyBytes), y * width * 4)
			for (let x = image.width; x < width; x++) {
				const idx = (width * y + x) << 2
				if (!inArea(x, y)) {
					result.data[idx] = 0
					result.data[idx + 1] = 0
					result.data[idx + 2] = 0
					result.data[idx + 3] = 64
				}
			}
		}
		return result
	}
