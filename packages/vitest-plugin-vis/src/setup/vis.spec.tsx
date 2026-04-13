import dedent from 'dedent'
import type { Options } from 'ssim.js'
import { testType } from 'type-plus'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { commands, page } from 'vitest/browser'
import { autoSnapshotMatcher } from '../client/suite/auto_snapshot_matcher.ts'
import { setAutoSnapshotOptions } from '../index.ts'
import { vis } from '../setup.ts'

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
})

describe('vis.setup({ auto: false })', () => {
	beforeAll(() => {
		vis.setup({ auto: false })
	})

	it('can enable auto snapshot', async () => {
		await render(<div data-testid="subject">hello</div>)
	})
})
