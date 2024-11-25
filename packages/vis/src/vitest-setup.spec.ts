import { composeStories } from '@storybook/react'
import { expect, it } from 'vitest'
import { commands, page } from './client/@vitest/browser/context.js'
import * as ImageDataStories from './client/image_data.stories.js'

const { ConversionRoundtrip } = composeStories(ImageDataStories)

it('should delete the results and diffs folder when the during `beforeAll`', async () => {
	const snapshotPlatform = await commands.getSnapshotPlatform()
	await expect(commands.existDir(`__vis__/${snapshotPlatform}/__diff_output__`)).resolves.toBe(false)
	await expect(commands.existDir(`__vis__/${snapshotPlatform}/__results__`)).resolves.toBe(false)
	await ConversionRoundtrip.run()
	await expect(page.imageSnapshot()).toMatchImageSnapshot()
})
