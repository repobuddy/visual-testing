import { describe, it } from 'vitest'
import { toDataURL } from '../external/browser/image_data.ts'
import { server } from '../external/vitest/vitest_browser_context_proxy.ts'
import { compareImageSnapshot } from './compare_image_snapshot.ts'

async function createPng(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	const ctx = canvas.getContext('2d')!
	ctx.fillStyle = 'white'
	ctx.fillRect(0, 0, width, height)
	draw(ctx)
	return (await toDataURL(ctx.getImageData(0, 0, width, height))).split(',')[1]!
}

function createCommands() {
	const files: Record<string, string> = {}
	return {
		files,
		commands: {
			writeFile: async (path: string, content: string) => {
				files[path] = content
			},
		} as any,
	}
}

async function compare(baseline: string, result: string, options?: { reviewImage?: boolean | 'full' }) {
	const { files, commands } = createCommands()
	const info = {
		projectRoot: '/project',
		baselinePath: '__vis__/__baselines__/a.spec.ts/case-1.png',
		resultPath: '__vis__/__results__/a.spec.ts/case-1.png',
		diffPath: '__vis__/__diffs__/a.spec.ts/case-1.png',
		baseline,
		result,
	}
	// `expectToFail` keeps the comparison failing when Vitest runs with `-u`
	const error: Error = await compareImageSnapshot(commands, 'case', info, { ...options, expectToFail: true }).then(
		() => {
			throw new Error('Should not reach')
		},
		(e) => e,
	)
	return { files, message: error.message }
}

const baseline = await createPng(200, 400, () => {})
const result = await createPng(200, 400, (ctx) => {
	ctx.fillStyle = 'black'
	ctx.fillRect(10, 10, 4, 4)
	ctx.fillRect(150, 350, 4, 4)
})

describe('when the snapshot mismatches', () => {
	it('lists the changed regions and writes them next to the diff', async ({ expect }) => {
		const { files, message } = await compare(baseline, result)

		expect(message).toMatch(/Changed:\s+2 regions: 30x30 at \(0,0\), 36x36 at \(134,334\)/)
		expect(JSON.parse(files['/project/__vis__/__diffs__/a.spec.ts/case-1.regions.json']!)).toEqual({
			width: 200,
			height: 400,
			regions: [
				{ x: 0, y: 0, width: 30, height: 30 },
				{ x: 134, y: 334, width: 36, height: 36 },
			],
		})
	})

	it('writes the review image and points to it', async ({ expect }) => {
		const { files, message } = await compare(baseline, result)

		expect(message).toMatch(
			/Review:\s+\.\/__vis__\/__diffs__\/a\.spec\.ts\/case-1\.review\.png \(baseline, result, diff of each region\)/,
		)
		expect(files['/project/__vis__/__diffs__/a.spec.ts/case-1.review.png']).toBeDefined()
		expect(files['/project/__vis__/__diffs__/a.spec.ts/case-1.png']).toBeDefined()
	})

	it('does not write the review image when `reviewImage` is false', async ({ expect }) => {
		const { files, message } = await compare(baseline, result, { reviewImage: false })

		expect(message).not.toMatch(/Review:/)
		expect(message).toMatch(/Changed:\s+2 regions/)
		expect(files['/project/__vis__/__diffs__/a.spec.ts/case-1.review.png']).toBeUndefined()
		expect(files['/project/__vis__/__diffs__/a.spec.ts/case-1.regions.json']).toBeDefined()
	})

	it('writes the whole images when the image size changed', async ({ expect }) => {
		const { files, message } = await compare(baseline, await createPng(200, 300, () => {}))

		expect(message).toMatch(
			/Review:\s+\.\/__vis__\/__diffs__\/a\.spec\.ts\/case-1\.review\.png \(baseline, result, diff of the whole image; not cropped, the image size changed\)/,
		)
		expect(message).not.toMatch(/skipped/)
		const size = await getPngSize(files['/project/__vis__/__diffs__/a.spec.ts/case-1.review.png']!)
		// padded to the larger size, 200x400, and placed left to right
		expect(size).toEqual({ width: 200 * 3 + 4 * 2, height: 400 })
	})

	it('writes the whole images when the regions cover most of the image', async ({ expect }) => {
		const { files, message } = await compare(
			baseline,
			await createPng(200, 400, (ctx) => {
				ctx.fillStyle = 'black'
				ctx.fillRect(0, 0, 200, 300)
			}),
		)

		expect(message).toMatch(
			/\(baseline, result, diff of the whole image; not cropped, the regions cover \d+% of the image\)/,
		)
		expect(files['/project/__vis__/__diffs__/a.spec.ts/case-1.review.png']).toBeDefined()
	})

	it('writes the whole images when there are too many regions', async ({ expect }) => {
		const { files, message } = await compare(
			baseline,
			await createPng(200, 400, (ctx) => {
				ctx.fillStyle = 'black'
				for (let i = 0; i < 6; i++) ctx.fillRect(10, 10 + i * 60, 4, 4)
			}),
		)

		expect(message).toMatch(/\(baseline, result, diff of the whole image; not cropped, 6 regions, more than 5\)/)
		expect(files['/project/__vis__/__diffs__/a.spec.ts/case-1.review.png']).toBeDefined()
	})

	it('always writes the whole images with `reviewImage: full`', async ({ expect }) => {
		const { files, message } = await compare(baseline, result, { reviewImage: 'full' })

		expect(message).toMatch(
			/Review:\s+\.\/__vis__\/__diffs__\/a\.spec\.ts\/case-1\.review\.png \(baseline, result, diff of the whole image\)$/m,
		)
		const size = await getPngSize(files['/project/__vis__/__diffs__/a.spec.ts/case-1.review.png']!)
		expect(size).toEqual({ width: 200 * 3 + 4 * 2, height: 400 })
	})
})

async function getPngSize(base64: string) {
	const image = new Image()
	image.src = `data:image/png;base64,${base64}`
	await image.decode()
	return { width: image.naturalWidth, height: image.naturalHeight }
}

describe('when there is no baseline', () => {
	const info = {
		projectRoot: '/project',
		baselinePath: '__vis__/__baselines__/a.spec.ts/case-1.png',
		resultPath: '__vis__/__results__/a.spec.ts/case-1.png',
		diffPath: '__vis__/__diffs__/a.spec.ts/case-1.png',
		baseline: undefined,
		result: baseline,
	}

	// With `-u` Vitest writes the missing baseline instead of failing.
	it.skipIf(server.config.snapshotOptions.updateSnapshot === 'all')(
		'fails and asks for a review',
		async ({ expect }) => {
			const { files, commands } = createCommands()
			await expect(compareImageSnapshot(commands, 'case', info as any)).rejects.toThrow(/has no baseline image/)
			expect(files).toEqual({})
		},
	)

	it('writes the baseline with `createMissingBaseline`', async ({ expect }) => {
		const { files, commands } = createCommands()
		await compareImageSnapshot(commands, 'case', info as any, { createMissingBaseline: true })
		expect(files['/project/__vis__/__baselines__/a.spec.ts/case-1.png']).toBeDefined()
	})
})
