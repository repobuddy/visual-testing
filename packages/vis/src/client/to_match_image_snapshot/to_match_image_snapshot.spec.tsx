import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { UNI_PNG_BASE64 } from '../../testing/constants'

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
