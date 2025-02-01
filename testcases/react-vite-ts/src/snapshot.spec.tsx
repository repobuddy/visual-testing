import { it } from 'vitest'
import { render } from 'vitest-browser-react'
import { Button } from './Button.js'

it('container snapshot', async ({ expect }) => {
	const { container } = await render(<Button label="Button" />)
	await expect(container).toMatchImageSnapshot()
})

it('subject snapshot', async ({ expect }) => {
	const { getByTestId } = await render(<Button label="Button" data-testid="subject" />)
	const subject = getByTestId('subject')
	await expect(subject).toMatchImageSnapshot()
})

it('can skip await', async ({ expect }) => {
	const { getByTestId } = await render(<Button label="Button" data-testid="subject" />)
	const subject = getByTestId('subject')
	expect(subject).toMatchImageSnapshot()
})
