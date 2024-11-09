import { render } from '@testing-library/react'
import { page } from 'storybook-addon-vis'
import { expect, it } from 'vitest'
import { Button } from './Button'

it('container snapshot', async () => {
	const { getByText, container } = await render(<Button label="Button" />)
	const subject = getByText('Button')
	expect(subject).toBeInTheDocument()
	await expect(page.imageSnapshot({ element: container })).toMatchImageSnapshot()
})

it('subject snapshot', async () => {
	const { getByTestId } = await render(<Button label="Button" data-testid="subject" />)
	const subject = getByTestId('subject')
	expect(subject).toBeInTheDocument()
	await expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot()
})

it('can skip await', async () => {
	const { getByTestId } = await render(<Button label="Button" data-testid="subject" />)
	const subject = getByTestId('subject')
	expect(subject).toBeInTheDocument()
	expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot()
})
