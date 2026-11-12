import { it } from 'vitest'
import { commands, page } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { TeamCard } from './showcase.tsx'

// Produces the images a failed comparison writes, without failing the run.
//
// `before` and `after` are the two inputs: the Team card, and the same card with a green button and
// the badge moved 40px left. Comparing `after` to the `before` baseline with `expectToFail` makes the
// plugin write its diff and review images exactly as a real failure does.
//
// Those images land in the git-ignored `__diffs__` folder, so this test snapshots them again as
// `diff` and `review`. That commits them as baselines and catches drift like any other baseline.
it('review a change', async ({ expect }) => {
	setAutoSnapshotOptions(false)
	const screen = await render(<TeamCard />)
	const card = page.getByTestId('plan-team')
	await expect(card).toMatchImageSnapshot({ snapshotKey: 'before' })

	await screen.rerender(<TeamCard buttonColor="#16a34a" badgeShift={40} />)
	await expect(card).toMatchImageSnapshot({ snapshotKey: 'after' })

	const message = await expect(card)
		.toMatchImageSnapshot({ snapshotKey: 'before', expectToFail: true })
		.then(
			() => {
				throw new Error('The changed card should not match the baseline')
			},
			(error: Error) => error.message,
		)

	expect(message).toMatch(/Changed: {4}2 regions: /)
	await expect(await readImage(message, 'Difference')).toMatchImageSnapshot({ snapshotKey: 'diff' })
	await expect(await readImage(message, 'Review')).toMatchImageSnapshot({ snapshotKey: 'review' })
})

/**
 * Reads, as base64, an image the failure message lists.
 * The message gives the path relative to the project root, which is where `commands.readFile()` resolves it.
 */
function readImage(message: string, label: 'Difference' | 'Review') {
	const path = new RegExp(`^\\s*${label}:\\s+(\\S+\\.png)`, 'm').exec(message)?.[1]
	if (!path) throw new Error(`No ${label} image in the failure message:\n${message}`)
	return commands.readFile(path, 'base64')
}
