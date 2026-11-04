import dedent from 'dedent'
import type { Options } from 'ssim.js'
import { testType } from 'type-plus/testing'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { commands, page } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { autoSnapshotMatcher } from '../client/suite/auto_snapshot_matcher.ts'
import * as setupEntry from '../exports/setup.ts'
import { vis } from '../exports/setup.ts'
import * as setupApi from '../exports/setup-api.ts'
import { setAutoSnapshotOptions } from '../index.ts'

describe('the setup entry points', () => {
	it('exports `vis` from setup, and `createVis` from setup-api only', ({ expect }) => {
		expect(setupEntry.vis).toBeDefined()
		expect('createVis' in setupEntry).toBe(false)
		expect(setupApi.createVis).toBeTypeOf('function')
	})

	it('augments `expect` and `page` with the image snapshot methods', ({ expect }) => {
		expect(page.toMatchImageSnapshot).toBeTypeOf('function')
		expect(page.hasImageSnapshot).toBeTypeOf('function')
		expect(expect(document.body).toMatchImageSnapshot).toBeTypeOf('function')
	})
})

describe('vis.setup({ auto: false })', () => {
	vis.setup({ auto: false })

	it('should not take auto snapshot', async () => {
		await render(<div data-testid="subject">hello</div>)
		expect(await page.hasImageSnapshot({ snapshotKey: 'auto' })).toBe(false)
	})
})

describe('vis.setup({ auto: true })', () => {
	vis.setup({ auto: true, createMissingBaseline: true })

	it('should take auto snapshot', async ({ onTestFinished }) => {
		await render(<div data-testid="subject">hello</div>)
		onTestFinished(async () => {
			expect(await page.hasImageSnapshot({ snapshotKey: 'auto' })).toBe(true)
		})
	})
})

describe('vis.setup({ auto: function })', () => {
	let bodyDone = false
	let ranAfterBody: boolean | undefined
	let received: Record<string, unknown> | undefined
	vis.setup({
		auto: async (meta) => {
			ranAfterBody = bodyDone
			received = meta
			return meta['visualTest'] === true
		},
		createMissingBaseline: true,
	})

	it('runs after the test body, receives the meta, and takes the snapshot when it returns true', async ({
		onTestFinished,
	}) => {
		bodyDone = false
		setAutoSnapshotOptions({ visualTest: true, createMissingBaseline: true })
		await render(<div data-testid="subject">hello</div>)
		bodyDone = true
		onTestFinished(async () => {
			expect(ranAfterBody).toBe(true)
			expect(received).toMatchObject({ enable: true, visualTest: true })
			expect(await page.hasImageSnapshot({ snapshotKey: 'auto' })).toBe(true)
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

	it('skips the theme when its handler returns false', async () => {
		await render(<div data-testid="subject">hello</div>)
		await themeSnapshots.createMatcher(
			{
				skipped: async () => false,
				taken: async () => {},
			},
			{ createMissingBaseline: true },
		)()
		expect(await page.hasImageSnapshot({ snapshotKey: 'skipped' })).toBe(false)
		expect(await page.hasImageSnapshot({ snapshotKey: 'taken' })).toBe(true)
		setAutoSnapshotOptions({ enable: false })
	})

	it('takes no auto snapshot when the `auto` function returns false', async () => {
		await render(<div data-testid="subject">hello</div>)
		await themeSnapshots.createMatcher({ auto: async () => false })()
		expect(await page.hasImageSnapshot({ snapshotKey: 'auto' })).toBe(false)
		setAutoSnapshotOptions({ enable: false })
	})

	it('rejects a theme name with a dash', async ({ expect }) => {
		await render(<div data-testid="subject">hello</div>)
		await expect(() => themeSnapshots.createMatcher({ 'dark-desktop': async () => {} })()).rejects.toThrow(
			'Snapshot key cannot contain dash',
		)
		setAutoSnapshotOptions({ enable: false })
	})

	it('accepts a theme name with an underscore or camelCase', async () => {
		await render(<div data-testid="subject">hello</div>)
		await themeSnapshots.createMatcher(
			{
				dark_desktop: async () => {},
				darkDesktop: async () => {},
			},
			{ createMissingBaseline: true },
		)()
		expect(await page.hasImageSnapshot({ snapshotKey: 'dark_desktop' })).toBe(true)
		expect(await page.hasImageSnapshot({ snapshotKey: 'darkDesktop' })).toBe(true)
		setAutoSnapshotOptions({ enable: false })
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
		const received: Array<Record<string, any>> = []
		const fakeExpect = () => ({
			toMatchImageSnapshot: async (options: Record<string, any>) => {
				received.push(options)
			},
		})
		const matcher = autoSnapshotMatcher(commands, fakeExpect)
		await render(<div data-testid="subject">hello</div>)

		setAutoSnapshotOptions(true)
		await matcher.createMatcher({ key: async () => {} }, { createMissingBaseline: true })()
		setAutoSnapshotOptions({ createMissingBaseline: false })
		await matcher.createMatcher({ key: async () => {} }, { createMissingBaseline: true })()

		expect(received.map((o) => o.createMissingBaseline)).toEqual([true, false])
		setAutoSnapshotOptions({ enable: false })
	})

	it('setAutoSnapshotOptions overrides the animations default of the matcher', async () => {
		const received: Array<Record<string, any>> = []
		const fakeExpect = () => ({
			toMatchImageSnapshot: async (options: Record<string, any>) => {
				received.push(options)
			},
		})
		const matcher = autoSnapshotMatcher(commands, fakeExpect)
		await render(<div data-testid="subject">hello</div>)

		setAutoSnapshotOptions(true)
		await matcher.createMatcher({ key: async () => {} }, { animations: 'disabled' })()
		setAutoSnapshotOptions({ animations: 'allow' })
		await matcher.createMatcher({ key: async () => {} }, { animations: 'disabled' })()

		expect(received.map((o) => o.animations)).toEqual(['disabled', 'allow'])
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

		it('supports failureThreshold with failureThresholdType', async () => {
			const match = await renderChanged('auto_threshold_type_compare')
			setAutoSnapshotOptions({ failureThreshold: 50, failureThresholdType: 'percent' })
			await match()
			setAutoSnapshotOptions({ failureThreshold: 0.001, failureThresholdType: 'percent', expectToFail: true })
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
