import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'pathe'
import { afterEach, beforeEach, describe, it, vi } from 'vitest'
import { getSnapshotSubpath, resolveSnapshotRootDirOption } from 'vitest-plugin-vis/server-utils'
import { createStorybookVisServer } from './create_storybook_vis_server.ts'

vi.mock('is-ci', () => ({ default: true }))
vi.mock('node:process', async (importOriginal) => ({
	...(await importOriginal<typeof import('node:process')>()),
	platform: 'linux',
}))

let tmpRoot: string
/**
 * Snapshot root as a function, so the addon uses the folder as is.
 */
let snapshotRootDir: () => string

beforeEach(() => {
	tmpRoot = mkdtempSync(join(tmpdir(), 'sav-'))
	snapshotRootDir = () => tmpRoot
})

afterEach(() => {
	vi.restoreAllMocks()
	rmSync(tmpRoot, { recursive: true, force: true })
})

function writeSnapshotFile(dir: string, filename: string, root = tmpRoot) {
	const folder = join(root, dir, 'button.stories.tsx')
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

it('gives `snapshotSubpath` the story path without the leading `./`, and reads from the folder it returns', async ({
	expect,
}) => {
	const folder = join(tmpRoot, '__baselines__', 'components', 'src', 'button.stories.tsx')
	mkdirSync(folder, { recursive: true })
	writeFileSync(join(folder, 'primary-1.png'), '')

	const received: string[] = []
	const server = createStorybookVisServer({
		visProjects: [
			{
				snapshotRootDir,
				snapshotSubpath: ({ subpath }) => {
					received.push(subpath)
					return `components/${subpath}`
				},
			},
		],
	})
	const results = await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

	expect(received).toEqual(['src/button.stories.tsx'])
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

describe('resolves the same folders as vitest-plugin-vis (#1001)', () => {
	it('reads the default `__vis__/<platform>` folder when `snapshotRootDir` is not set', async ({ expect }) => {
		vi.spyOn(process, 'cwd').mockReturnValue(tmpRoot)
		writeSnapshotFile('__baselines__', 'primary-1.png', join(tmpRoot, '__vis__/linux'))
		writeSnapshotFile('__baselines__', 'primary-1.png', join(tmpRoot, '__vis__'))

		const server = createStorybookVisServer({ visProjects: [{}] })
		const results = await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

		expect(resolveSnapshotRootDirOption(undefined, () => ({}))).toBe('__vis__/linux')
		expect(results.map((r) => r.snapshotRootDir)).toEqual(['__vis__/linux'])
	})

	it('adds the platform folder to a string `snapshotRootDir`, as the plugin does', async ({ expect }) => {
		const root = join(tmpRoot, 'custom')
		writeSnapshotFile('__baselines__', 'primary-1.png', join(root, 'linux'))
		writeSnapshotFile('__baselines__', 'primary-1.png', root)

		const server = createStorybookVisServer({ visProjects: [{ snapshotRootDir: root }] })
		const results = await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

		expect(results.map((r) => r.snapshotRootDir)).toEqual([resolveSnapshotRootDirOption(root, () => ({}))])
		expect(results.map((r) => r.snapshotRootDir)).toEqual([`${root}/linux`])
	})

	it('gives a custom `snapshotSubpath` the same subpath as the plugin', async ({ expect }) => {
		const received: string[] = []
		const snapshotSubpath = ({ subpath }: { subpath: string }) => {
			received.push(subpath)
			return subpath
		}
		writeSnapshotFile('__baselines__/src', 'primary-1.png')

		const server = createStorybookVisServer({ visProjects: [{ snapshotRootDir, snapshotSubpath }] })
		const results = await server.getImageSnapshotResults('primary', './src/button.stories.tsx')
		// the plugin passes the test file path relative to the project root
		getSnapshotSubpath('src/button.stories.tsx', { snapshotSubpath })

		expect(received).toEqual(['src/button.stories.tsx', 'src/button.stories.tsx'])
		expect(results).toHaveLength(1)
	})

	it('passes the plugin context fields to a `snapshotRootDir` function, with project fields from the entry', async ({
		expect,
	}) => {
		const calls: unknown[] = []
		const server = createStorybookVisServer({
			visProjects: [
				{
					projectName: 'HD',
					browserName: 'chromium',
					providerName: 'playwright',
					snapshotRootDir(context) {
						calls.push(context)
						return tmpRoot
					},
				},
				{
					snapshotRootDir(context) {
						calls.push(context)
						return tmpRoot
					},
				},
			],
		})
		await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

		expect(calls).toEqual([
			{
				ci: true,
				rootDir: '__vis__',
				platform: 'linux',
				projectName: 'HD',
				browserName: 'chromium',
				providerName: 'playwright',
				screenshotFailures: undefined,
				screenshotDirectory: undefined,
			},
			{
				ci: true,
				rootDir: '__vis__',
				platform: 'linux',
				projectName: undefined,
				browserName: undefined,
				providerName: undefined,
				screenshotFailures: undefined,
				screenshotDirectory: undefined,
			},
		])
	})

	it('reads per-instance folders from a `snapshotRootDir` function that uses `projectName`', async ({ expect }) => {
		const fn = ({ ci, platform, projectName }: { ci: boolean; platform: string; projectName?: string | undefined }) =>
			join(tmpRoot, `__vis__/${ci ? platform : 'local'}/${projectName}`)
		writeSnapshotFile('__baselines__', 'primary-1.png', join(tmpRoot, '__vis__/linux/HD'))
		writeSnapshotFile('__baselines__', 'primary-1.png', join(tmpRoot, '__vis__/linux/SVGA'))

		const server = createStorybookVisServer({
			visProjects: [
				{ projectName: 'HD', snapshotRootDir: fn },
				{ projectName: 'SVGA', snapshotRootDir: fn },
			],
		})
		const results = await server.getImageSnapshotResults('primary', './src/button.stories.tsx')

		expect(results.map((r) => r.snapshotRootDir)).toEqual([
			join(tmpRoot, '__vis__/linux/HD'),
			join(tmpRoot, '__vis__/linux/SVGA'),
		])
	})
})
