import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { Button } from './Button.js'

it('container snapshot', async () => {
	const { container } = await render(<Button label="Button" />)
	await expect(container).toMatchImageSnapshot()
})

it('subject snapshot', async () => {
	const { getByTestId } = await render(<Button label="Button" data-testid="subject" />)
	const subject = getByTestId('subject')
	await expect(subject).toMatchImageSnapshot()
})

it('can skip await', async () => {
	const { getByTestId } = await render(<Button label="Button" data-testid="subject" />)
	const subject = getByTestId('subject')
	expect(subject).toMatchImageSnapshot()
})
