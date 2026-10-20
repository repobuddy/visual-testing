import { describe, it } from 'vitest'
import { toDataURL } from '../external/browser/image_data.ts'
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

async function compare(baseline: string, result: string, options?: { reviewImage?: boolean }) {
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

	it('skips the review image when the image size changed', async ({ expect }) => {
		const { files, message } = await compare(baseline, await createPng(200, 300, () => {}))

		expect(message).toMatch(/Review:\s+skipped, the image size changed; open Actual or Difference instead/)
		expect(files['/project/__vis__/__diffs__/a.spec.ts/case-1.review.png']).toBeUndefined()
	})

	it('skips the review image when the regions cover most of the image', async ({ expect }) => {
		const { message } = await compare(
			baseline,
			await createPng(200, 400, (ctx) => {
				ctx.fillStyle = 'black'
				ctx.fillRect(0, 0, 200, 300)
			}),
		)

		expect(message).toMatch(/Review:\s+skipped, the regions cover \d+% of the image/)
	})
})
