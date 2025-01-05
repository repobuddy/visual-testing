import { page } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
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

it('take snapshot of the whole body', async () => {
	page.render(<Button primary label="Button" />)
	await expect(document.body).toMatchImageSnapshot()
})

it('can disable snapshot', async () => {
	setAutoSnapshotOptions(false)
	page.render(<Button primary label="Button" />)
})

it('can check if snapshot exists', async () => {
	setAutoSnapshotOptions(false)

	expect(await page.hasImageSnapshot()).toBe(false)
})
