import { it } from 'vitest'
import { existFile } from './exist_file.js'

it('returns when `testPath` is undefined', () => {
	existFile({} as any, '')
})
