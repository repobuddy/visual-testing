/**
 * Prunes `cSpell.words` in `.vscode/settings.json` when a word never appears
 * in repository file contents (excluding that settings file). Case-insensitive.
 *
 * Run from repo root: pnpm cleanup:cspell
 * Requires Node.js ≥ 22.6 (type stripping). Older: npx --yes tsx .cursor/skills/cleanup-cspell-words/cleanup-cspell-words.mts
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Paths matching complex .gitignore patterns the simple fallback walker does not parse. */
const FALLBACK_SKIP_SUBSTRINGS = ['.git', '.vscode', 'node_modules']

function findRepoRoot(): string {
	const start = dirname(fileURLToPath(import.meta.url))
	const r = spawnSync('git', ['rev-parse', '--show-toplevel'], {
		cwd: start,
		encoding: 'utf8',
	})
	if (r.status === 0) return r.stdout.trim()
	let dir = resolve(start)
	const seen = new Set<string>()
	while (!seen.has(dir)) {
		seen.add(dir)
		if (existsSync(join(dir, '.git'))) return dir
		const parent = dirname(dir)
		if (parent === dir) break
		dir = parent
	}
	throw new Error('Could not find git repository root. Install git or run from a clone with a .git directory.')
}

/** Single-segment directory names from .gitignore (no *, ?, /, !negation). Always includes `.git`. */
function directoryNamesFromGitignore(repoRoot: string): Set<string> {
	const skip = new Set<string>(['.git'])
	const path = join(repoRoot, '.gitignore')
	let raw: string
	try {
		raw = readFileSync(path, 'utf8')
	} catch {
		return skip
	}
	for (const line of raw.split(/\r?\n/)) {
		const t = line.trim()
		if (!t || t.startsWith('#')) continue
		if (t.startsWith('!')) continue
		if (t.includes('*') || t.includes('?') || t.includes('[') || t.includes('/')) continue
		skip.add(t.replace(/\/$/, ''))
	}
	return skip
}

function shouldSkipRelPath(rel: string): boolean {
	const norm = rel.replaceAll('\\', '/')
	if (norm === '.vscode/settings.json') return true
	for (const s of FALLBACK_SKIP_SUBSTRINGS) {
		if (norm.includes(s)) return true
	}
	return false
}

function listFilesViaGit(repoRoot: string): string[] | null {
	const r = spawnSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {
		cwd: repoRoot,
		encoding: 'buffer',
		maxBuffer: 100 * 1024 * 1024,
	})
	if (r.status !== 0) return null
	const out = r.stdout.toString('utf8')
	return out
		.split('\0')
		.filter(Boolean)
		.map((p) => join(repoRoot, p))
		.filter((abs) => !shouldSkipRelPath(relative(repoRoot, abs)))
}

function listFilesWalkFallback(repoRoot: string): string[] {
	const skipDirNames = directoryNamesFromGitignore(repoRoot)
	const files: string[] = []
	function walk(dir: string) {
		for (const ent of readdirSync(dir, { withFileTypes: true })) {
			const abs = join(dir, ent.name)
			const rel = relative(repoRoot, abs)
			if (shouldSkipRelPath(rel)) continue
			if (ent.isDirectory()) {
				if (skipDirNames.has(ent.name)) continue
				walk(abs)
			} else if (ent.isFile()) {
				files.push(abs)
			}
		}
	}
	walk(repoRoot)
	return files
}

function getNodeSearchFiles(repoRoot: string): string[] {
	return listFilesViaGit(repoRoot) ?? listFilesWalkFallback(repoRoot)
}

function parseArgs(argv: string[]) {
	const dryRun = argv.includes('--dry-run')
	return { dryRun }
}

function tryRipgrep(word: string, repoRoot: string): boolean | null {
	const r = spawnSync('rg', ['-l', '-i', '-F', word, '--glob', '!.vscode/settings.json', '.'], {
		cwd: repoRoot,
		encoding: 'utf8',
		maxBuffer: 50 * 1024 * 1024,
	})
	if (r.error && (r.error as NodeJS.ErrnoException).code === 'ENOENT') return null
	if (r.status === 0) return r.stdout.trim().length > 0
	if (r.status === 1) return false
	throw new Error(`rg failed (${r.status}): ${r.stderr || r.error}`)
}

function wordExistsNodeSearch(word: string, filePaths: string[]): boolean {
	const needle = word.toLowerCase()
	for (const abs of filePaths) {
		let text: string
		try {
			text = readFileSync(abs, 'utf8')
		} catch {
			continue
		}
		if (text.toLowerCase().includes(needle)) return true
	}
	return false
}

function wordExistsInRepo(word: string, repoRoot: string, nodeFiles: string[]): boolean {
	const rg = tryRipgrep(word, repoRoot)
	if (rg !== null) return rg
	return wordExistsNodeSearch(word, nodeFiles)
}

type Settings = Record<string, unknown> & { 'cSpell.words'?: string[] }

function replaceCSpellWordsArray(raw: string, newWords: string[]): string {
	const key = '"cSpell.words"'
	const keyIdx = raw.indexOf(key)
	if (keyIdx === -1) throw new Error(`Missing ${key} in settings`)

	const bracketStart = raw.indexOf('[', keyIdx)
	if (bracketStart === -1) throw new Error('Missing [ after cSpell.words')

	let depth = 0
	let i = bracketStart
	for (; i < raw.length; i++) {
		const c = raw[i]
		if (c === '[') depth++
		else if (c === ']') {
			depth--
			if (depth === 0) {
				i++
				break
			}
		}
	}
	if (depth !== 0) throw new Error('Unbalanced brackets in cSpell.words')

	const lines = newWords.map((w) => `\t\t${JSON.stringify(w)}`).join(',\n')
	const newBlock = `[\n${lines}\n\t]`
	return raw.slice(0, bracketStart) + newBlock + raw.slice(i)
}

function main() {
	const repoRoot = findRepoRoot()
	const settingsPath = join(repoRoot, '.vscode', 'settings.json')
	const { dryRun } = parseArgs(process.argv.slice(2))
	const raw = readFileSync(settingsPath, 'utf8')
	const settings = JSON.parse(raw) as Settings
	const words = settings['cSpell.words']
	if (!Array.isArray(words) || !words.every((w) => typeof w === 'string')) {
		throw new Error('cSpell.words must be an array of strings')
	}

	const nodeFiles = getNodeSearchFiles(repoRoot)

	const removed: string[] = []
	const kept: string[] = []
	for (const w of words) {
		if (wordExistsInRepo(w, repoRoot, nodeFiles)) kept.push(w)
		else removed.push(w)
	}

	console.info(`Checked ${words.length} words; keep ${kept.length}, remove ${removed.length}`)
	if (removed.length) console.info('Remove:', removed.join(', '))
	else console.info('Nothing to remove.')

	if (dryRun || removed.length === 0) return

	const next = replaceCSpellWordsArray(raw, kept)
	writeFileSync(settingsPath, next, 'utf8')
	console.info(`Updated ${relative(repoRoot, settingsPath)}`)
}

main()
