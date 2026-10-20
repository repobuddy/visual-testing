import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'pathe'
import { afterEach, beforeEach, it } from 'vitest'
import { createStorybookVisServer } from './create_storybook_vis_server.ts'

let snapshotRootDir: string

beforeEach(() => {
	snapshotRootDir = mkdtempSync(join(tmpdir(), 'sav-'))
})

afterEach(() => {
	rmSync(snapshotRootDir, { recursive: true, force: true })
})

function writeSnapshotFile(dir: string, filename: string) {
	const folder = join(snapshotRootDir, dir, 'button.stories.tsx')
	mkdirSync(folder, { recursive: true })
	writeFileSync(join(folder, filename), '')
}

it('does not list the review image or the changed regions as a diff', async ({ expect }) => {
	writeSnapshotFile('__baselines__', 'primary-1.png')
	writeSnapshotFile('__diffs__', 'primary-1.png')
	writeSnapshotFile('__diffs__', 'primary-1.review.png')
	writeSnapshotFile('__diffs__', 'primary-1.regions.json')

	const server = createStorybookVisServer({ visProjects: [{ snapshotRootDir }] })
	const results = await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

	expect(results.map((r) => [r.type, r.fileName])).toEqual([
		['baseline', 'primary-1.png'],
		['diff', 'primary-1.png'],
	])
})
