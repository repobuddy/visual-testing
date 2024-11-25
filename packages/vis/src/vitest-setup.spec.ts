import { composeStories } from '@storybook/react'
import { expect, it } from 'vitest'
import { commands, page } from './client/@vitest/browser/context.js'
import * as ImageDataStories from './client/image_data.stories.js'
import { DIFF_OUTPUT_DIR, RESULT_DIR } from './shared/contants.js'

const { ConversionRoundtrip } = composeStories(ImageDataStories)

it('should delete the results and diffs folder when the during `beforeAll`', async () => {
	const snapshotPlatform = await commands.getSnapshotPlatform()
	await expect(commands.existDir(`__vis__/${snapshotPlatform}/${DIFF_OUTPUT_DIR}`)).resolves.toBe(false)
	await expect(commands.existDir(`__vis__/${snapshotPlatform}/${RESULT_DIR}`)).resolves.toBe(false)
	await ConversionRoundtrip.run()
	await expect(page.imageSnapshot()).toMatchImageSnapshot()
})
