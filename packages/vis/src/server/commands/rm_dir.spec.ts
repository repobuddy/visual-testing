import { it } from 'vitest'
import { rmDir } from './rm_dir.js'

it('returns when `testPath` is undefined', () => {
	rmDir({} as any, '')
})
