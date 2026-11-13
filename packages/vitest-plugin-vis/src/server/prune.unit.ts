import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, normalize } from 'pathe'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getTestFileCandidates, planPrune, removeBaselineFolder } from './prune.ts'
import { runCli } from './prune_cli.ts'

let root: string

beforeEach(async () => {
	root = normalize(await mkdtemp(join(tmpdir(), 'vis-prune-')))
})

afterEach(async () => {
	await rm(root, { recursive: true, force: true })
})

async function touch(...paths: string[]) {
	for (const p of paths) {
		const abs = join(root, p)
		await mkdir(dirname(abs), { recursive: true })
		await writeFile(abs, '')
	}
}

function exists(p: string) {
	return existsSync(join(root, p))
}

async function cli(...argv: string[]) {
	const out: string[] = []
	const err: string[] = []
	const code = await runCli(argv, { cwd: root, log: (m) => out.push(m), error: (m) => err.push(m) })
	return { code, out: out.join('\n'), err: err.join('\n') }
}

const B = '__vis__/linux/__baselines__'

describe(getTestFileCandidates.name, () => {
	it('returns the path itself and the paths with a common folder in front', () => {
		expect(getTestFileCandidates('button.spec.tsx')).toEqual([
			'button.spec.tsx',
			'tests/button.spec.tsx',
			'test/button.spec.tsx',
			'src/button.spec.tsx',
			'source/button.spec.tsx',
			'js/button.spec.tsx',
			'ts/button.spec.tsx',
			'lib/button.spec.tsx',
		])
	})

	it('drops candidates that do not map back to the subpath', () => {
		// The file `src/x.spec.ts` maps to `x.spec.ts`, not to `src/x.spec.ts`.
		const candidates = getTestFileCandidates('src/x.spec.ts')
		expect(candidates).not.toContain('src/x.spec.ts')
		expect(candidates).toContain('src/src/x.spec.ts')
		expect(candidates).toContain('tests/src/x.spec.ts')
	})

	it('maps `__` back to `..`', () => {
		expect(getTestFileCandidates('__/x.spec.ts')).toContain('../x.spec.ts')
	})
})

describe(planPrune.name, () => {
	it('flags the folder of a deleted test file and keeps the others', async () => {
		await touch('src/kept.spec.tsx', `${B}/kept.spec.tsx/a-1.png`, `${B}/gone.spec.tsx/a-1.png`)
		const plan = await planPrune(root)
		expect(plan.refusals).toEqual([])
		expect(plan.orphans).toEqual([{ path: join(root, B, 'gone.spec.tsx'), baselineRoot: join(root, B) }])
	})

	it('flags the old folder of a moved test file', async () => {
		await touch('src/new/button.spec.tsx', `${B}/old/button.spec.tsx/a-1.png`, `${B}/new/button.spec.tsx/a-1.png`)
		const plan = await planPrune(root)
		expect(plan.orphans.map((o) => o.path)).toEqual([join(root, B, 'old/button.spec.tsx')])
	})

	it('checks every platform and project folder', async () => {
		await touch(
			'src/kept.spec.ts',
			...['linux/HD', 'win32/SVGA', 'darwin', 'local'].flatMap((p) => [
				`__vis__/${p}/__baselines__/kept.spec.ts/a-1.png`,
				`__vis__/${p}/__baselines__/gone.spec.ts/a-1.png`,
			]),
		)
		const plan = await planPrune(root)
		expect(plan.orphans.map((o) => o.path).sort()).toEqual(
			['darwin', 'linux/HD', 'local', 'win32/SVGA'].map((p) => join(root, `__vis__/${p}/__baselines__/gone.spec.ts`)),
		)
	})

	it('keeps nested task folders of a live test file', async () => {
		await touch('src/a.spec.ts', `${B}/a.spec.ts/describe/nested.spec.ts/x-1.png`)
		expect((await planPrune(root)).orphans).toEqual([])
	})

	it('descends into a folder named like a test file when the project has that folder', async () => {
		await touch('src/lib.js/b.spec.ts', `${B}/lib.js/b.spec.ts/x-1.png`, `${B}/lib.js/gone.spec.ts/x-1.png`)
		const plan = await planPrune(root)
		expect(plan.orphans.map((o) => o.path)).toEqual([join(root, B, 'lib.js/gone.spec.ts')])
	})

	it('keeps folders shortened by shortenLongSnapshotPaths', async () => {
		await touch('src/a.spec.ts', `${B}/a.spec.ts/x-1.png`, `${B}/Button-0123456789ab.tsx/x-1.png`)
		const plan = await planPrune(root)
		expect(plan.orphans).toEqual([])
		expect(plan.kept.map((k) => k.path)).toEqual([join(root, B, 'Button-0123456789ab.tsx')])
	})

	it('warns when a config sets shortenLongSnapshotPaths', async () => {
		await touch('src/a.spec.ts', `${B}/a.spec.ts/x-1.png`)
		await writeFile(join(root, 'vitest.config.ts'), 'vis({ shortenLongSnapshotPaths: true })')
		const plan = await planPrune(root)
		expect(plan.refusals).toEqual([])
		expect(plan.warnings.map((w) => w.path)).toEqual([join(root, 'vitest.config.ts')])
	})

	it.each(['vitest.config.ts', 'vite.config.mts', 'vitest.config.playwright.ts', '.storybook/main.ts'])(
		'refuses when %s sets snapshotSubpath',
		async (config) => {
			await touch('src/a.spec.ts', `${B}/a.spec.ts/x-1.png`, `${B}/gone.spec.ts/x-1.png`, config)
			await writeFile(join(root, config), 'vis({ snapshotSubpath: ({ subpath }) => subpath })')
			const plan = await planPrune(root)
			expect(plan.refusals.map((r) => r.path)).toEqual([join(root, config)])
		},
	)

	it('reads the configs of parent folders up to cwd', async () => {
		await touch('packages/a/src/a.spec.ts', `packages/a/${B}/a.spec.ts/x-1.png`)
		await writeFile(join(root, 'vitest.config.ts'), 'snapshotSubpath')
		const plan = await planPrune(root)
		expect(plan.refusals.map((r) => r.path)).toEqual([join(root, 'vitest.config.ts')])
	})

	it('uses the parent of each __vis__ folder as its project root', async () => {
		await touch(
			'packages/a/src/a.spec.ts',
			`packages/a/${B}/a.spec.ts/x-1.png`,
			`packages/a/${B}/gone.spec.ts/x-1.png`,
			'packages/b/src/b.spec.ts',
			`packages/b/${B}/b.spec.ts/x-1.png`,
		)
		const plan = await planPrune(root)
		expect(plan.orphans.map((o) => o.path)).toEqual([join(root, 'packages/a', B, 'gone.spec.ts')])
	})

	it('refuses a baseline root where no folder matches a test file', async () => {
		await touch(`${B}/a.spec.ts/x-1.png`, `${B}/b.spec.ts/x-1.png`)
		const plan = await planPrune(root)
		expect(plan.refusals.map((r) => r.path)).toEqual([join(root, B)])
	})

	it('skips node_modules', async () => {
		await touch(`node_modules/pkg/${B}/gone.spec.ts/x-1.png`)
		expect(await planPrune(root)).toEqual({ orphans: [], kept: [], refusals: [], warnings: [] })
	})
})

describe(removeBaselineFolder.name, () => {
	it('removes the folder and the empty parents up to __baselines__', async () => {
		await touch(`${B}/a/b/gone.spec.ts/x-1.png`, `${B}/a/c.png`)
		await removeBaselineFolder({ path: join(root, B, 'a/b/gone.spec.ts'), baselineRoot: join(root, B) })
		expect(exists(`${B}/a/b`)).toBe(false)
		expect(exists(`${B}/a/c.png`)).toBe(true)
	})

	it('keeps the __baselines__ folder', async () => {
		await touch(`${B}/gone.spec.ts/x-1.png`)
		await removeBaselineFolder({ path: join(root, B, 'gone.spec.ts'), baselineRoot: join(root, B) })
		expect(exists(B)).toBe(true)
	})
})

describe('vitest-plugin-vis prune', () => {
	beforeEach(async () => {
		await touch('src/kept.spec.ts', `${B}/kept.spec.ts/x-1.png`, `${B}/dir/gone.spec.ts/x-1.png`)
	})

	it('lists orphaned folders with --dry-run and deletes nothing', async () => {
		const r = await cli('prune', '--dry-run')
		expect(r.code).toBe(0)
		expect(r.out).toContain('1 orphaned baseline folder found. Run without --dry-run to remove it.')
		expect(r.out).toContain(`↳ ${B}/dir/gone.spec.ts`)
		expect(exists(`${B}/dir/gone.spec.ts/x-1.png`)).toBe(true)
	})

	it('deletes orphaned folders and the empty folders they leave', async () => {
		const r = await cli('prune')
		expect(r.code).toBe(0)
		expect(r.out).toContain('1 orphaned baseline folder removed')
		expect(exists(`${B}/dir`)).toBe(false)
		expect(exists(`${B}/kept.spec.ts/x-1.png`)).toBe(true)
	})

	it('reports when nothing is orphaned', async () => {
		await rm(join(root, B, 'dir'), { recursive: true })
		const r = await cli('prune')
		expect(r).toMatchObject({ code: 0, out: expect.stringContaining('No orphaned baseline folders found.') })
	})

	it('refuses and deletes nothing when a config sets snapshotSubpath', async () => {
		await writeFile(join(root, 'vitest.config.ts'), 'vis({ snapshotSubpath })')
		for (const argv of [['prune'], ['prune', '--dry-run']]) {
			const r = await cli(...argv)
			expect(r.code).toBe(1)
			expect(r.err).toContain('prune refused. Nothing was deleted.')
			expect(r.err).toContain('vitest.config.ts: it sets `snapshotSubpath`')
		}
		expect(exists(`${B}/dir/gone.spec.ts/x-1.png`)).toBe(true)
	})

	it('prints the warning for shortenLongSnapshotPaths', async () => {
		await writeFile(join(root, 'vitest.config.ts'), 'vis({ shortenLongSnapshotPaths: true })')
		const r = await cli('prune', '--dry-run')
		expect(r.code).toBe(0)
		expect(r.out).toContain('warning: vitest.config.ts: it sets `shortenLongSnapshotPaths`')
	})

	it.each([[[]], [['nope']], [['prune', 'extra']], [['prune', '--force']]])(
		'fails on bad arguments %j',
		async (argv) => {
			const r = await cli(...argv)
			expect(r.code).toBe(1)
			expect(r.err).toContain('Usage: vitest-plugin-vis prune [--dry-run]')
			expect(exists(`${B}/dir/gone.spec.ts/x-1.png`)).toBe(true)
		},
	)

	it('prints help', async () => {
		const r = await cli('--help')
		expect(r.code).toBe(0)
		expect(r.out).toContain('Usage: vitest-plugin-vis prune [--dry-run]')
	})
})
