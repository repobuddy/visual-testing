import { page } from '@vitest/browser/context'
import dedent from 'dedent'
import { describe, it } from 'vitest'
import { setAutoSnapshotOptions } from '../client.ts'
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
		setAutoSnapshotOptions({ customizeSnapshotId: (id) => `${id}-custom` })

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

		await expect(page.hasImageSnapshot({ customizeSnapshotId: (id) => `${id}-custom-theme1` })).resolves.toBe(true)
		await expect(page.hasImageSnapshot({ customizeSnapshotId: (id) => `${id}-custom-theme2` })).resolves.toBe(true)
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
})
