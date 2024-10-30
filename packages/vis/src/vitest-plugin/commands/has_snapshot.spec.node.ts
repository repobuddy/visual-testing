import { fileURLToPath } from 'node:url'
import { hasSnapshot } from './has_snapshot'

const testPath = fileURLToPath(import.meta.url)

it('returns true if snapshot exists', async () => {
	expect(await hasSnapshot({ testPath } as any, '_has_snapshot_test_', 'with-snapshot')).toBe(true)
})
it('returns true if no snapshot', async () => {
	expect(await hasSnapshot({ testPath } as any, '_has_snapshot_test_', 'no-snapshot')).toBe(false)
})
