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

it('lists the result image of each snapshot, named the same as its baseline', async ({ expect }) => {
	writeSnapshotFile('__baselines__', 'primary-1.png')
	writeSnapshotFile('__results__', 'primary-1.png')
	writeSnapshotFile('__diffs__', 'primary-1.png')
	writeSnapshotFile('__diffs__', 'primary-1.review.png')

	const server = createStorybookVisServer({ visProjects: [{ snapshotRootDir }] })
	const results = await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

	expect(results.map((r) => [r.type, r.fileName])).toEqual([
		['baseline', 'primary-1.png'],
		['result', 'primary-1.png'],
		['diff', 'primary-1.png'],
	])
})

it('does not list result images of other stories', async ({ expect }) => {
	writeSnapshotFile('__baselines__', 'primary-1.png')
	writeSnapshotFile('__results__', 'primary-1.png')
	writeSnapshotFile('__results__', 'secondary-1.png')

	const server = createStorybookVisServer({ visProjects: [{ snapshotRootDir }] })
	const results = await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

	expect(results.map((r) => [r.type, r.fileName])).toEqual([
		['baseline', 'primary-1.png'],
		['result', 'primary-1.png'],
	])
})

it('passes only `ci` and `platform` to a snapshotRootDir function', async ({ expect }) => {
	const calls: unknown[] = []
	const server = createStorybookVisServer({
		visProjects: [
			{
				snapshotRootDir(context) {
					calls.push(context)
					return snapshotRootDir
				},
			},
		],
	})
	await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

	expect(calls).toHaveLength(1)
	expect(Object.keys(calls[0] as object).sort()).toEqual(['ci', 'platform'])
})

it('gives `snapshotSubpath` the story import path as Storybook reports it, and reads from the folder it returns', async ({
	expect,
}) => {
	const folder = join(snapshotRootDir, '__baselines__', 'components', 'src', 'button.stories.tsx')
	mkdirSync(folder, { recursive: true })
	writeFileSync(join(folder, 'primary-1.png'), '')

	const received: string[] = []
	const server = createStorybookVisServer({
		visProjects: [
			{
				snapshotRootDir,
				snapshotSubpath: ({ subpath }) => {
					received.push(subpath)
					return `components/${subpath.replace(/^\.\//, '')}`
				},
			},
		],
	})
	const results = await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

	expect(received).toEqual(['./src/button.stories.tsx'])
	expect(results.map((r) => [r.type, r.fileName])).toEqual([['baseline', 'primary-1.png']])
})

it('drops a leading `src/` from the subpath by default', async ({ expect }) => {
	writeSnapshotFile('__baselines__', 'primary-1.png')

	const server = createStorybookVisServer({ visProjects: [{ snapshotRootDir }] })
	const results = await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

	expect(results).toHaveLength(1)
})

it('names the story folder lookup after the story name, lowercased with other characters as dashes', async ({
	expect,
}) => {
	writeSnapshotFile('__baselines__', 'my-story-1.png')

	const server = createStorybookVisServer({ visProjects: [{ snapshotRootDir }] })
	const results = await server.getImageSnapshotResults('My Story', './src/button.stories.tsx')

	expect(results.map((r) => r.fileName)).toEqual(['my-story-1.png'])
})
