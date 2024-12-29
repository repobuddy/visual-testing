import { page } from '@vitest/browser/context'
import { afterEach, expect, it } from 'vitest'
import { UNI_PNG_BASE64 } from '../testing/constants.ts'
import { ctx } from './to_match_image_snapshot.ctx.ts'

afterEach(() => ctx.__test__reset())

it('passes when not running in test', () => {
	// stub as success when not in a test (e.g. in a story)
	ctx.getCurrentTest = () => undefined as any

	expect(document.body).toMatchImageSnapshot()
})

it('accepts a Locator', async () => {
	page.render(<div data-testid="subject">hello</div>)
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot()
})

it('accepts an element', async () => {
	page.render(<div data-testid="subject">hello</div>)
	const subject = page.getByTestId('subject')
	await expect(subject.element()).toMatchImageSnapshot()
})

it('accepts `document.body`', async () => {
	page.render(<div data-testid="subject">hello</div>)
	await expect(document.body).toMatchImageSnapshot()
})

it('accepts `baseElement` (same as body)', async () => {
	// the png file created is not valid
	const { baseElement } = page.render(<div data-testid="subject">hello</div>)
	await expect(baseElement).toMatchImageSnapshot()
})

it('accepts a base64 image', async () => {
	await expect(UNI_PNG_BASE64).toMatchImageSnapshot()
})
