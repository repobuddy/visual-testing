import { page } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { Button } from './Button.js'

it('can disable snapshot', async () => {
	setAutoSnapshotOptions(false)
	page.render(<Button primary label="Button" />)
})

it('can check if snapshot exists', async () => {
	setAutoSnapshotOptions(false)

	expect(await page.hasImageSnapshot()).toBe(false)
})
