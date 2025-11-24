import { page } from 'vitest/browser'
import './augment.ts'
import { hasImageSnapshot } from './has_image_snapshot.ts'
import { toMatchImageSnapshot } from './to_match_image_snapshot.ts'

page.extend({ hasImageSnapshot, toMatchImageSnapshot })
