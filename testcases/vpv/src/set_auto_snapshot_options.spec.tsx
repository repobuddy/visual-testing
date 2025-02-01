import { page } from '@vitest/browser/context'
import { it } from 'vitest'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { Button } from './Button.js'

it('can disable snapshot', async ({ expect }) => {
	setAutoSnapshotOptions(false)
	page.render(<Button primary label="Button" />)
	expect(await page.hasImageSnapshot()).toBe(false)
})
