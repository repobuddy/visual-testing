import dedent from 'dedent'
import type { Options } from 'ssim.js'
import { testType } from 'type-plus/testing'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { commands, page } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { autoSnapshotMatcher } from '../client/suite/auto_snapshot_matcher.ts'
import { vis } from '../exports/setup.ts'
import { setAutoSnapshotOptions } from '../index.ts'

describe('vis.setup({ auto: false })', () => {
	vis.setup({ auto: false })

	it('should not take auto snapshot', async () => {
		await render(<div data-testid="subject">hello</div>)
		expect(await page.hasImageSnapshot()).toBe(false)
	})
})

describe.skip('vis.setup({ auto: true })', () => {
	vis.setup({ auto: true })

	it('should take auto snapshot', async ({ onTestFinished }) => {
		await render(<div data-testid="subject">hello</div>)
		onTestFinished(async () => {
			expect(await page.hasImageSnapshot()).toBe(true)
		})
	})
})

const themeSnapshots = autoSnapshotMatcher(commands, expect)

describe('matchPerTheme', () => {
	beforeAll(async () => {
		await themeSnapshots.setup()
	})
	beforeEach(() => setAutoSnapshotOptions(true))

	it('should take a snapshot for each theme', async () => {
		await render(<div data-testid="subject">hello</div>)
		const subject = page.getByTestId('subject')
		await themeSnapshots.createMatcher({
			theme1: async () => {
				subject.element().innerHTML = 'theme1'
			},
			theme2: async () => {
				subject.element().innerHTML = 'theme2'
			},
		})()
	})

	it('should take all snapshots even if one fails', async ({ expect }) => {
		await render(<div data-testid="subject">hello</div>)
		const subject = page.getByTestId('subject')
		if (
			!page.hasImageSnapshot({
				snapshotKey: 'theme2',
			})
		) {
			await themeSnapshots.createMatcher({
				theme2: async () => {
					subject.element().innerHTML = 'theme2'
				},
			})()
		}
		await expect(() =>
			themeSnapshots.createMatcher({
				theme1: async () => {
					throw new Error('theme1 failed')
				},
				theme2: async () => {
					subject.element().innerHTML = 'theme2'
				},
			})(),
		).rejects.toThrow('theme1 failed')
	})

	it('should aggregate all errors', async ({ expect }) => {
		await render(<div data-testid="subject">hello</div>)
		await expect(() =>
			themeSnapshots.createMatcher({
				theme1: async () => {
					throw new Error('theme1 failed')
				},
				theme2: async () => {
					throw new Error('theme2 failed')
				},
			})(),
		).rejects.toThrow(dedent`Snapshot \`matchpertheme/should-aggregate-all-errors\` mismatched

			Theme \`theme1\` failed: theme1 failed

			Theme \`theme2\` failed: theme2 failed`)
	})

	// cannot run this test because no way to get the failed test to pass again
	it.skip('should not take snapshot if the test failed', async ({ expect, onTestFinished }) => {
		onTestFinished(
			themeSnapshots.createMatcher({
				theme1: async () => {
					throw new Error('should not reach')
				},
				theme2: async () => {
					throw new Error('should not reach')
				},
			}),
		)
		await render(<div data-testid="subject">hello</div>)
		const subject = page.getByTestId('subject')
		expect(subject).toBeInTheDocument()
		expect(subject).toHaveTextContent('world')
	})

	it('pass meta to theme handler', async ({ expect }) => {
		setAutoSnapshotOptions(true)
		await render(<div data-testid="subject">hello</div>)
		await themeSnapshots.createMatcher({
			theme1(meta) {
				expect(meta).toMatchObject({ enable: true })
			},
		})()
	})

	it('can specify type param', () => {
		themeSnapshots.createMatcher<'ssim'>({
			x(_options) {
				testType.equal<typeof _options.diffOptions, Partial<Options> | undefined>(true)
				return false
			},
		})
	})

	it('createMatcher createMissingBaseline writes baseline when missing', async () => {
		setAutoSnapshotOptions(true)
		await render(<div data-testid="subject">hello</div>)
		const snapshotKey = 'create_missing_baseline_matcher'
		if (!(await page.hasImageSnapshot({ snapshotKey }))) {
			await themeSnapshots.createMatcher(
				{
					[snapshotKey]: async () => {},
				},
				{ createMissingBaseline: true },
			)()
		}
		expect(await page.hasImageSnapshot({ snapshotKey })).toBe(true)
		setAutoSnapshotOptions({ enable: false })
	})

	it('setAutoSnapshotOptions overrides the createMissingBaseline default of the matcher', async () => {
		setAutoSnapshotOptions({ enable: true, createMissingBaseline: false })
		await render(<div data-testid="subject">hello</div>)
		const snapshotKey = 'create_missing_baseline_override'
		await expect(
			themeSnapshots.createMatcher({ [snapshotKey]: async () => {} }, { createMissingBaseline: true })(),
		).rejects.toThrow()
		expect(await page.hasImageSnapshot({ snapshotKey })).toBe(false)
		setAutoSnapshotOptions({ enable: false })
	})

	describe('comparison options of setAutoSnapshotOptions', () => {
		async function renderChanged(snapshotKey: string) {
			setAutoSnapshotOptions({ enable: true })
			const screen = await render(<div data-testid="subject">baseline</div>)
			await themeSnapshots.createMatcher({ [snapshotKey]: async () => {} }, { createMissingBaseline: true })()
			await screen.rerender(<div data-testid="subject">changed content</div>)
			return () => themeSnapshots.createMatcher({ [snapshotKey]: async () => {} })()
		}

		it('fails by default when the image is different', async () => {
			const match = await renderChanged('auto_default_compare')
			await expect(match()).rejects.toThrow(/Expected image to match but was differ by \d+ pixels\./)
			setAutoSnapshotOptions({ enable: false })
		})

		it('supports failureThreshold with failureThresholdType', async () => {
			const match = await renderChanged('auto_threshold_type_compare')
			setAutoSnapshotOptions({ failureThreshold: 50, failureThresholdType: 'percent' })
			await match()
			setAutoSnapshotOptions({ failureThreshold: 0.001, failureThresholdType: 'percent' })
			await expect(match()).rejects.toThrow(/Expected image to match within 0\.001% but was differ by \d+\.\d+%\./)
			setAutoSnapshotOptions({ enable: false })
		})

		it('supports the pixel diffOptions', async () => {
			const match = await renderChanged('auto_diff_options_compare')
			setAutoSnapshotOptions({ diffOptions: { threshold: 1 } })
			await match()
			setAutoSnapshotOptions({ enable: false })
		})

		it('supports expectToFail', async () => {
			const match = await renderChanged('auto_expect_to_fail_compare')
			setAutoSnapshotOptions({ expectToFail: true })
			await expect(match()).rejects.toThrow(/Expected image to match but was differ by \d+ pixels\./)
			setAutoSnapshotOptions({ enable: false })
		})
	})
})
