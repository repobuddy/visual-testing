import { it } from 'vitest'
import { existDir } from './exist_dir.js'

it('returns when `testPath` is undefined', () => {
	existDir({} as any, '')
})
