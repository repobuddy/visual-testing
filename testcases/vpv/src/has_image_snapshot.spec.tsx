import { page } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { Button } from './Button.js'

it('can disable snapshot', async () => {
	page.render(<Button primary label="Button" />)
})

it('can check if snapshot exists', async () => {
	expect(await page.hasImageSnapshot()).toBe(false)
})
