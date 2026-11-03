import { expect, it, vi } from 'vitest'
import { stubBrowserCommandContext } from '../testing/stubBrowserCommandContext.ts'
import { preparePageImageSnapshotComparison } from './prepare_page_image_snapshot_comparison.ts'

const { takePageSnapshot } = vi.hoisted(() => ({ takePageSnapshot: vi.fn() }))

vi.mock('../snapshot.ts', () => ({ takePageSnapshot }))
vi.mock('../project.ts', () => ({ getProjectRoot: () => '/root' }))
vi.mock('../externals/file.ts', () => ({ file: { tryReadFile: async () => undefined } }))
vi.mock('../vis_server_context.ts', () => ({
	visServerContext: { getSnapshotInfo: async () => ({ baselinePath: 'baseline.png', resultPath: 'result.png' }) },
}))

it('should throw error when testPath is not provided', async () => {
	await expect(() => preparePageImageSnapshotComparison(stubBrowserCommandContext(), '')).rejects.toThrow(
		`'commands.preparePageImageSnapshotComparison' requires testPath to be defined`,
	)
})

async function timeoutPassedToTakePageSnapshot(options: { timeout?: number } | null) {
	takePageSnapshot.mockResolvedValue(Buffer.from('image'))
	await preparePageImageSnapshotComparison(stubBrowserCommandContext({ testPath: 'a.spec.ts' }), 'task', options as any)
	return takePageSnapshot.mock.calls.at(-1)![3].timeout
}

it('uses a timeout of 30000 ms by default', async () => {
	expect(await timeoutPassedToTakePageSnapshot({})).toBe(30000)
	expect(await timeoutPassedToTakePageSnapshot(null)).toBe(30000)
})

it('uses the timeout option when given', async () => {
	expect(await timeoutPassedToTakePageSnapshot({ timeout: 60000 })).toBe(60000)
})
