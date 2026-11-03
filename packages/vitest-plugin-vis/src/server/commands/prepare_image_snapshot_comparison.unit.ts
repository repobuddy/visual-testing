import { expect, it, vi } from 'vitest'
import { stubBrowserCommandContext } from '../testing/stubBrowserCommandContext.ts'
import { prepareImageSnapshotComparison } from './prepare_image_snapshot_comparison.ts'

const { takeSnapshot } = vi.hoisted(() => ({ takeSnapshot: vi.fn() }))

vi.mock('../snapshot.ts', () => ({ takeSnapshot }))
vi.mock('../project.ts', () => ({ getProjectRoot: () => '/root' }))
vi.mock('../externals/file.ts', () => ({ file: { tryReadFile: async () => undefined } }))
vi.mock('../vis_server_context.ts', () => ({
	visServerContext: { getSnapshotInfo: async () => ({ baselinePath: 'baseline.png', resultPath: 'result.png' }) },
}))

it('should throw error when testPath is not provided', async () => {
	await expect(() => prepareImageSnapshotComparison(stubBrowserCommandContext(), '', '')).rejects.toThrow(
		`'commands.prepareImageSnapshotComparison' requires testPath to be defined`,
	)
})

async function timeoutPassedToTakeSnapshot(options: { timeout?: number } | null) {
	takeSnapshot.mockResolvedValue(Buffer.from('image'))
	await prepareImageSnapshotComparison(
		stubBrowserCommandContext({ testPath: 'a.spec.ts' }),
		'task',
		'#subject',
		options as any,
	)
	return takeSnapshot.mock.calls.at(-1)![4].timeout
}

it('uses a timeout of 30000 ms by default', async () => {
	expect(await timeoutPassedToTakeSnapshot({})).toBe(30000)
	expect(await timeoutPassedToTakeSnapshot(null)).toBe(30000)
})

it('uses the timeout option when given', async () => {
	expect(await timeoutPassedToTakeSnapshot({ timeout: 60000 })).toBe(60000)
})
