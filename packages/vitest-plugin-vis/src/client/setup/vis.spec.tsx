import { page } from '@vitest/browser/context'
import dedent from 'dedent'
import type { Options } from 'ssim.js'
import { testType } from 'type-plus'
import { beforeEach, describe, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { setAutoSnapshotOptions, type SnapshotMeta } from '../../index.ts'
import { vis } from '../../setup.ts'

describe('matchPerTheme', () => {
	beforeEach(() => setAutoSnapshotOptions(true))

	it('should take a snapshot for each theme', async () => {
		render(<div data-testid="subject">hello</div>)
		const subject = page.getByTestId('subject')
		await vis.afterEach.matchPerTheme({
			theme1: async () => {
				subject.element().innerHTML = 'theme1'
			},
			theme2: async () => {
				subject.element().innerHTML = 'theme2'
			},
		})()
	})

	it('should take all snapshots even if one fails', async ({ expect }) => {
		render(<div data-testid="subject">hello</div>)
		const subject = page.getByTestId('subject')
		if (
			!page.hasImageSnapshot({
				snapshotKey: 'theme2',
			})
		) {
			await vis.afterEach.matchPerTheme({
				theme2: async () => {
					subject.element().innerHTML = 'theme2'
				},
			})()
		}
		await expect(() =>
			vis.afterEach.matchPerTheme({
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
		render(<div data-testid="subject">hello</div>)
		await expect(() =>
			vis.afterEach.matchPerTheme({
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
			vis.afterEach.matchPerTheme({
				theme1: async () => {
					throw new Error('should not reach')
				},
				theme2: async () => {
					throw new Error('should not reach')
				},
			}),
		)
		render(<div data-testid="subject">hello</div>)
		const subject = page.getByTestId('subject')
		expect(subject).toBeInTheDocument()
		expect(subject).toHaveTextContent('world')
	})

	it('pass meta to theme handler', async ({ expect }) => {
		setAutoSnapshotOptions(true)
		render(<div data-testid="subject">hello</div>)
		await vis.afterEach.matchPerTheme({
			theme1(meta) {
				expect(meta).toMatchObject({ enable: true })
			},
		})()
	})

	it('can specify type param', () => {
		vis.afterEach.matchPerTheme<SnapshotMeta<'ssim'>>({
			x(options) {
				testType.equal<typeof options.diffOptions, Partial<Options> | undefined>(true)
				return false
			},
		})
	})
})

// too complicated to validate
describe('presets.enable()', () => {
	beforeEach(() => vis.presets.enable())

	it('can enable auto snapshot', async () => {
		render(<div data-testid="subject">hello</div>)
	})
})
