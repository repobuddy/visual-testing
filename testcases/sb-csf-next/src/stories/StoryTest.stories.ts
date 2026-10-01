/**
 * CSF Next stories with `story.test()` child tests.
 *
 * Storybook wraps the child tests in a `describe` titled with the story name plus two trailing spaces.
 * The snapshots must land under `<story>/`, not `<story>--/` (#847).
 */

import { expect, fn } from 'storybook/test'
import preview from '#.storybook/preview'

import { Button } from './Button.tsx'

const meta = preview.meta({
	title: 'Example/StoryTest',
	component: Button,
	args: { onClick: fn() },
})

export const Snap = meta.story({
	tags: ['snapshot'],
	args: { label: 'Snap' },
})

Snap.test('variant one', async ({ canvas }) => {
	await expect(canvas.getByRole('button')).toBeInTheDocument()
})
