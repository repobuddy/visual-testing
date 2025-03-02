import { page } from '@vitest/browser/context'
import dedent from 'dedent'
import type { Options } from 'ssim.js'
import { testType } from 'type-plus'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { type SnapshotMeta, setAutoSnapshotOptions } from '../client.ts'
import { ctx } from '../client/ctx.ts'
import { vis } from './vis.ts'

describe('matchPerTheme', () => {
	it('should take a snapshot for each theme', async () => {
		page.render(<div data-testid="subject">hello</div>)
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
		page.render(<div data-testid="subject">hello</div>)
		const subject = page.getByTestId('subject')
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
		page.render(<div data-testid="subject">hello</div>)
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

	it('works with customizeSnapshotId', async ({ expect }) => {
		setAutoSnapshotOptions({ customizeSnapshotId: ({ id }) => `${id}-custom` })

		page.render(<div data-testid="subject">hello</div>)
		const subject = page.getByTestId('subject')
		await vis.afterEach.matchPerTheme({
			theme1: async () => {
				subject.element().innerHTML = 'theme1'
			},
			theme2: async () => {
				subject.element().innerHTML = 'theme2'
			},
		})()

		await expect(page.hasImageSnapshot({ customizeSnapshotId: ({ id }) => `${id}-custom-theme1` })).resolves.toBe(true)
		await expect(page.hasImageSnapshot({ customizeSnapshotId: ({ id }) => `${id}-custom-theme2` })).resolves.toBe(true)
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
		page.render(<div data-testid="subject">hello</div>)
		const subject = page.getByTestId('subject')
		expect(subject).toBeInTheDocument()
		expect(subject).toHaveTextContent('world')
	})

	it('pass meta to theme handler', async ({ expect }) => {
		setAutoSnapshotOptions(true)
		page.render(<div data-testid="subject">hello</div>)
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

describe('presets.enable()', () => {
	beforeEach(() => vis.presets.enable())

	afterEach(() => ctx.__test__reset())

	it.sequential('can enable auto snapshot', async () => {
		setAutoSnapshotOptions({ customizeSnapshotId: ({ id }) => id })

		page.render(<div data-testid="subject">hello</div>)
	})
	it.sequential('can enable auto snapshot (validate)', async ({ expect }) => {
		await expect(
			page.hasImageSnapshot({ customizeSnapshotId: () => 'presets-enable--/can-enable-auto-snapshot' }),
		).resolves.toBe(true)
	})
})
