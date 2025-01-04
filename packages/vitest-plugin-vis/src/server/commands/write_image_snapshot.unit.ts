import { expect, it } from 'vitest'
import { stubBrowserCommandContext } from '../../testing.ts'
import { writeImageSnapshot } from './write_image_snapshot.ts'

it('should throw if the file path is absolute', async () => {
	expect(() => writeImageSnapshot(stubBrowserCommandContext(), '/src', '')).rejects.toThrow(
		`'relativeFilePath' must be a relative path`,
	)
})
