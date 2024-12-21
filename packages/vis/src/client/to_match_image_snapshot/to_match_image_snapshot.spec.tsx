import { assertType } from 'type-plus'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { UNI_PNG_BASE64 } from '../../testing/constants.js'

it('should fails immediately if the subject is undefined', async () => {
	expect(() => expect(undefined).toMatchImageSnapshot2()).toThrowError(
		'`toMatchImageSnapshot()` expects the subject to be an element, locator, or image encoded in base64 string, but got: `undefined`',
	)
})

it('accepts Locator', async () => {
	const screen = render(<div data-testid="subject">unit</div>)
	const locator = screen.getByTestId('subject')
	await expect(locator).toMatchImageSnapshot2()
})

it('accepts Element', async () => {
	const screen = render(<div data-testid="subject">unit</div>)
	const locator = screen.getByTestId('subject')
	await expect(locator.element()).toMatchImageSnapshot2()
})

it('accepts base64 image', async () => {
	await expect(UNI_PNG_BASE64).toMatchImageSnapshot2()
})

it('should fail if the subject is a string but not base64 encoded', async () => {
	expect(() => expect('abc').toMatchImageSnapshot2()).toThrowError(
		'`toMatchImageSnapshot()` expects the subject to be an element, locator, or image encoded in base64 string, but got: `undefined`',
	)
})
