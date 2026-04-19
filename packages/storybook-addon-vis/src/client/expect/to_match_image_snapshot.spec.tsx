import { composeStories } from '@storybook/react-vite'
import { screen } from '@testing-library/react'
import React from 'react'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { page, server } from 'vitest/browser'
import { setAutoSnapshotOptions } from '../../exports/vitest-setup.ts'
import { hasImageSnapshot } from '../../index.ts'
import { UNI_PNG_BASE64 } from '../../testing.ts'
import * as stories from './to_match_image_snapshot.stories.tsx'

const { MatchingElement } = composeStories(stories)

it('accepts Locator', async () => {
	const screen = await render(<div data-testid="subject">unit</div>)
	const locator = screen.getByTestId('subject')
	await expect(locator).toMatchImageSnapshot()
})

it('accepts Element', async () => {
	const screen = await render(<div data-testid="subject">unit</div>)
	const locator = screen.getByTestId('subject')
	await expect(locator.element()).toMatchImageSnapshot()
})

it('accepts `baseElement` (same as body)', async () => {
	// the png file created is not valid
	const screen = await render(<div data-testid="subject">unit</div>)
	await expect(screen.baseElement).toMatchImageSnapshot()
})

it('accepts document.body', async () => {
	await render(<div data-testid="subject">unit</div>)
	await expect(document.body).toMatchImageSnapshot()
})

it('accepts base64 image', async () => {
	await expect(UNI_PNG_BASE64).toMatchImageSnapshot()
})

it('should fail immediately if the subject is a string but not base64 encoded', async () => {
	await expect(() => expect('abc').toMatchImageSnapshot()).rejects.toThrowError(
		`'toMatchImageSnapshot()' expects the subject to be an element, locator, or image encoded in base64 string, but got: abc`,
	)
})

it.each([undefined, null, true, false, 1])('should fails immediately if the subject is %s', async (value) => {
	await expect(() => expect(value).toMatchImageSnapshot()).rejects.toThrowError(
		`'toMatchImageSnapshot()' expects the subject to be an element, locator, or image encoded in base64 string, but got: ${value}`,
	)
})

it('can customize snapshot key', async () => {
	await MatchingElement.run()
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot({
		snapshotKey: 'custom',
	})
	expect(
		await hasImageSnapshot({
			snapshotKey: 'custom',
		}),
	).toBeTruthy()
})

// Storybook Vitest browser RPC may drop `createMissingBaseline`; use updateSnapshot 'all' for missing-baseline bootstrap (see overview.mdx).
it('writes missing baseline when updateSnapshot is all', async () => {
	setAutoSnapshotOptions({ enable: false })
	await render(<div data-testid="save-new-storybook-expect">save new storybook</div>)
	const subject = page.getByTestId('save-new-storybook-expect')
	const snapshotKey = 'create_missing_baseline_storybook_expect'
	const snap = server.config.snapshotOptions
	const prevUpdate = snap.updateSnapshot
	snap.updateSnapshot = 'all'
	try {
		if (!(await hasImageSnapshot({ snapshotKey }))) {
			await expect(subject).toMatchImageSnapshot({ snapshotKey })
		}
		expect(await hasImageSnapshot({ snapshotKey })).toBe(true)
		await expect(subject).toMatchImageSnapshot({ snapshotKey })
	} finally {
		snap.updateSnapshot = prevUpdate
	}
})

it('can use screen from @testing-library/react to get element', async () => {
	await MatchingElement.run()
	const subject = screen.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot()
})

it('can use ssim comparison', async () => {
	await MatchingElement.run()
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot({
		comparisonMethod: 'ssim',
		diffOptions: { ssim: 'bezkrovny' },
	})
})
