import { expect } from 'vitest'
import { toMatchImageSnapshot } from './to_match_image_snapshot.ts'
import './augment.ts'

expect.extend({ toMatchImageSnapshot })
