import { it } from 'vitest'
import { copyFile } from './copy_file.js'

it('returns when `testPath` is undefined', () => {
	copyFile({} as any, '', '')
})
