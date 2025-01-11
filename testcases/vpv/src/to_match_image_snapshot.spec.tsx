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

it('uses options set in vis()', async () => {
	setAutoSnapshotOptions(false)
	const hasSnapshot = await page.hasImageSnapshot({ customizeSnapshotId: (id) => id })
	const screen = page.render(<div data-testid="subject">hello</div>)
	const subject = screen.getByTestId('subject')
	if (!hasSnapshot) {
		await expect(subject).toMatchImageSnapshot({ customizeSnapshotId: (id) => id })
	}

	subject.element().innerHTML = 'world'

	await expect(subject)
		.toMatchImageSnapshot({
			expectToFail: true,
			customizeSnapshotId: (id) => id,
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(
					`Options:    failureThreshold: 0.01 percent
            timeout: 60000 ms
            comparisonMethod: ssim
            diffOptions: {\"ssim\":\"bezkrovny\"}`,
				)
			},
		)
})
