import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { setAutoSnapshotOptions } from '#vitest-plugin-vis'
import { ctx } from './_ctx.ts'

afterEach(() => ctx.__test__reset())

it('throws when not running in a test', ({ expect }) => {
	ctx.getCurrentTest = () => undefined as any
	expect(() => page.toMatchImageSnapshot()).toThrow('`toMatchImageSnapshot()` must be called in a test.')
})

it('throws an error when running in a concurrent test', ({ expect }) => {
	ctx.getCurrentTest = () => ({ concurrent: true }) as any
	expect(() => page.toMatchImageSnapshot()).toThrow(
		'`toMatchImageSnapshot()` cannot be called in a concurrent test because ' +
			"concurrent tests run at the same time in the same iframe and affect each other's environment.",
	)
})

it('rejects snapshot key with dash', async ({ expect }) => {
	await expect(() => page.toMatchImageSnapshot({ snapshotKey: 'invalid-key' })).rejects.toThrowError(
		'Snapshot key cannot contain dash',
	)
})

it('takes an image snapshot', async () => {
	await render(<div style={{ height: '1000px', backgroundColor: 'greenyellow' }}>hello world</div>)
	await page.toMatchImageSnapshot({
		snapshotKey: 'test_snapshot',
		createMissingBaseline: true,
	})

	await expect(
		page.hasImageSnapshot({
			snapshotKey: 'test_snapshot',
		}),
	).resolves.toBe(true)
})

it('supports full page image snapshot', async () => {
	await render(<div style={{ height: '1000px', backgroundColor: 'greenyellow' }}>hello world</div>)
	await page.toMatchImageSnapshot({
		fullPage: true,
		snapshotKey: 'test_snapshot',
	})
	await expect(
		page.hasImageSnapshot({
			snapshotKey: 'test_snapshot',
		}),
	).resolves.toBe(true)
})

describe('createMissingBaseline option', () => {
	beforeEach(() => setAutoSnapshotOptions({ enable: false }))

	it('createMissingBaseline writes baseline when missing', async () => {
		await render(<div data-testid="subject">page save new</div>)
		const snapshotKey = 'create_missing_baseline_page'
		if (!(await page.hasImageSnapshot({ snapshotKey }))) {
			await page.toMatchImageSnapshot({ snapshotKey, createMissingBaseline: true })
		}
		await expect(
			page.hasImageSnapshot({
				snapshotKey,
			}),
		).resolves.toBe(true)
	})
})

describe('comparison options', () => {
	beforeEach(() => setAutoSnapshotOptions({ enable: false }))

	async function renderChanged(snapshotKey: string) {
		const screen = await render(<div style={{ backgroundColor: 'greenyellow', height: '100px' }}>baseline</div>)
		await page.toMatchImageSnapshot({ snapshotKey, createMissingBaseline: true })
		await screen.rerender(<div style={{ backgroundColor: 'greenyellow', height: '100px' }}>changed content</div>)
	}

	it('fails with the pixel difference', async () => {
		await renderChanged('page_pixel_compare')
		await expect(page.toMatchImageSnapshot({ snapshotKey: 'page_pixel_compare' })).rejects.toThrow(
			/Expected image to match but was differ by \d+ pixels\./,
		)
	})

	it('supports failureThreshold with failureThresholdType percent', async () => {
		await renderChanged('page_percent_compare')
		await page.toMatchImageSnapshot({
			snapshotKey: 'page_percent_compare',
			failureThreshold: 50,
			failureThresholdType: 'percent',
		})
		await expect(
			page.toMatchImageSnapshot({
				snapshotKey: 'page_percent_compare',
				failureThreshold: 0.001,
				failureThresholdType: 'percent',
			}),
		).rejects.toThrow(/Expected image to match within 0\.001% but was differ by \d+\.\d+%\./)
	})

	it('supports comparisonMethod ssim and diffOptions', async () => {
		await renderChanged('page_ssim_compare')
		await expect(
			page.toMatchImageSnapshot({
				snapshotKey: 'page_ssim_compare',
				comparisonMethod: 'ssim',
				diffOptions: { ssim: 'fast' },
				failureThreshold: 1,
			}),
		).rejects.toThrow(/Expected image to match within 1 pixels but was differ by \d+ pixels\./)
	})

	it('supports pixel diffOptions', async () => {
		await renderChanged('page_diff_options_compare')
		await page.toMatchImageSnapshot({
			snapshotKey: 'page_diff_options_compare',
			diffOptions: { threshold: 1 },
		})
	})

	it('supports expectToFail', async () => {
		await renderChanged('page_expect_to_fail')
		await expect(page.toMatchImageSnapshot({ snapshotKey: 'page_expect_to_fail', expectToFail: true })).rejects.toThrow(
			/Expected image to match but was differ by \d+ pixels\./,
		)
		await render(<div>unchanged</div>)
		await page.toMatchImageSnapshot({ snapshotKey: 'page_expect_to_fail_match', createMissingBaseline: true })
		await expect(
			page.toMatchImageSnapshot({ snapshotKey: 'page_expect_to_fail_match', expectToFail: true }),
		).rejects.toThrow(/matched but expected to fail/)
	})
})
