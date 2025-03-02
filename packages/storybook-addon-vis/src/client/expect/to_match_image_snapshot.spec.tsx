import { composeStories } from '@storybook/react'
import { screen } from '@testing-library/react'
import { page } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { hasImageSnapshot } from '../../index.ts'
import { UNI_PNG_BASE64 } from '../../testing.ts'
import * as stories from './to_match_image_snapshot.stories.tsx'

const { MatchingElement } = composeStories(stories)

it('accepts Locator', async () => {
	const screen = page.render(<div data-testid="subject">unit</div>)
	const locator = screen.getByTestId('subject')
	await expect(locator).toMatchImageSnapshot()
})

it('accepts Element', async () => {
	const screen = render(<div data-testid="subject">unit</div>)
	const locator = screen.getByTestId('subject')
	await expect(locator.element()).toMatchImageSnapshot()
})

it('accepts `baseElement` (same as body)', async () => {
	// the png file created is not valid
	const screen = render(<div data-testid="subject">unit</div>)
	await expect(screen.baseElement).toMatchImageSnapshot()
})

it('accepts document.body', async () => {
	render(<div data-testid="subject">unit</div>)
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

it('can customize snapshot filename', async () => {
	await MatchingElement.run()
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot({
		customizeSnapshotId: ({ id }) => `${id}-custom`,
	})
	expect(
		await hasImageSnapshot({
			customizeSnapshotId: ({ id }) => `${id}-custom`,
		}),
	).toBeTruthy()
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
