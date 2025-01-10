import { page } from '@vitest/browser/context'
import dedent from 'dedent'
import { describe, expect, it } from 'vitest'
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

	it('should take all snapshots even if one fails', async () => {
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

	it('should aggregate all errors', async () => {
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
})
