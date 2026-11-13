import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const packageRoot = fileURLToPath(new URL('../..', import.meta.url))
const binPath = join(packageRoot, 'dist/bin/storybook-addon-vis.mjs')

let root: string

beforeEach(async () => {
	root = await mkdtemp(join(tmpdir(), 'sav-bin-'))
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

function run(...argv: string[]) {
	return new Promise<{ code: number; out: string; err: string }>((resolve) => {
		execFile(process.execPath, [binPath, ...argv], { cwd: root }, (error, stdout, stderr) => {
			resolve({ code: error ? Number(error.code ?? 1) : 0, out: stdout, err: stderr })
		})
	})
}

const B = '__vis__/linux/__baselines__'

describe('package.json', () => {
	it('declares the `storybook-addon-vis` bin inside the published files', async () => {
		const pkg = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'))
		expect(pkg.bin).toEqual({ 'storybook-addon-vis': './dist/bin/storybook-addon-vis.mjs' })
		expect(pkg.files).toContain('dist')
		expect(pkg.dependencies['vitest-plugin-vis']).toBeDefined()
	})

	it('builds the bin with a node shebang', async () => {
		const content = await readFile(binPath, 'utf8')
		expect(content.startsWith('#!/usr/bin/env node\n')).toBe(true)
		expect(content).toContain('from "vitest-plugin-vis/cli"')
	})
})

describe('storybook-addon-vis', () => {
	it('prints help with its own name and exits 0', async () => {
		const r = await run('--help')
		expect(r.code).toBe(0)
		expect(r.out).toContain('Usage: storybook-addon-vis prune [--dry-run]')
	})

	it.each([[[]], [['nope']], [['prune', '--force']]])('exits 1 on bad arguments %j', async (argv) => {
		const r = await run(...argv)
		expect(r.code).toBe(1)
		expect(r.err).toContain('Usage: storybook-addon-vis prune [--dry-run]')
	})

	it('forwards `prune --dry-run`: lists orphaned folders and keeps them', async () => {
		await touch('src/button.stories.tsx', `${B}/button.stories.tsx/a-1.png`, `${B}/gone.stories.tsx/a-1.png`)
		const r = await run('prune', '--dry-run')
		expect(r.code).toBe(0)
		expect(r.out).toContain('1 orphaned baseline folder found')
		expect(r.out).toContain(`${B}/gone.stories.tsx`)
		expect(existsSync(join(root, B, 'gone.stories.tsx/a-1.png'))).toBe(true)
	})

	it('forwards `prune`: deletes orphaned folders', async () => {
		await touch('src/button.stories.tsx', `${B}/button.stories.tsx/a-1.png`, `${B}/gone.stories.tsx/a-1.png`)
		const r = await run('prune')
		expect(r.code).toBe(0)
		expect(r.out).toContain('1 orphaned baseline folder removed')
		expect(existsSync(join(root, B, 'gone.stories.tsx'))).toBe(false)
		expect(existsSync(join(root, B, 'button.stories.tsx/a-1.png'))).toBe(true)
	})

	it('exits 1 and deletes nothing when prune refuses', async () => {
		await touch('src/button.stories.tsx', `${B}/button.stories.tsx/a-1.png`, `${B}/gone.stories.tsx/a-1.png`)
		await writeFile(join(root, 'vitest.config.ts'), 'export default { plugins: [vis({ snapshotSubpath: () => "x" })] }')
		const r = await run('prune')
		expect(r.code).toBe(1)
		expect(r.err).toContain('prune refused')
		expect(existsSync(join(root, B, 'gone.stories.tsx/a-1.png'))).toBe(true)
	})
})
