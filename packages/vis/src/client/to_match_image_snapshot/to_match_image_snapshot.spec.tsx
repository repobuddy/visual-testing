import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'

it('accepts Locator', async () => {
	const screen = render(<div data-testid="subject">unit</div>)
	const locator = screen.getByTestId('subject')
	await expect(locator).toMatchImageSnapshot2()
})
