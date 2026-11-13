import { parseArgs } from 'node:util'
import { relative } from 'pathe'
import { type BaselineFolder, type PrunePlan, planPrune, removeBaselineFolder } from './prune.ts'

export type CliIO = {
	cwd: string
	log(message: string): void
	error(message: string): void
	planPrune?: ((cwd: string) => Promise<PrunePlan>) | undefined
	removeFolder?: ((folder: BaselineFolder) => Promise<void>) | undefined
}

export const USAGE = `Usage: vitest-plugin-vis prune [--dry-run]

Commands:
  prune        Delete the baseline folders whose test file no longer exists,
               for every platform folder under __vis__.

Options:
  --dry-run    List the folders without deleting them.
  -h, --help   Show this help.`

/**
 * Runs the `vitest-plugin-vis` command line.
 *
 * @returns the exit code: `0` on success, `1` when it refuses or the arguments are wrong.
 */
export async function runCli(argv: string[], io: CliIO): Promise<number> {
	let parsed: ReturnType<typeof parse>
	try {
		parsed = parse(argv)
	} catch (e) {
		io.error(`${(e as Error).message}\n\n${USAGE}`)
		return 1
	}
	const { values, positionals } = parsed
	if (values.help) {
		io.log(USAGE)
		return 0
	}
	const [command, ...rest] = positionals
	if (command !== 'prune' || rest.length > 0) {
		io.error(`${command ? `Unknown command: ${[command, ...rest].join(' ')}` : 'Missing command.'}\n\n${USAGE}`)
		return 1
	}
	return prune(io, values['dry-run'] === true)
}

function parse(argv: string[]) {
	return parseArgs({
		args: argv,
		allowPositionals: true,
		options: { 'dry-run': { type: 'boolean' }, help: { type: 'boolean', short: 'h' } },
	})
}

async function prune(io: CliIO, dryRun: boolean) {
	const { planPrune: plan = planPrune, removeFolder = removeBaselineFolder, cwd } = io
	const rel = (p: string) => relative(cwd, p) || '.'
	const { orphans, kept, refusals, warnings } = await plan(cwd)

	for (const w of warnings) io.log(` vis  warning: ${rel(w.path)}: ${w.message}`)

	if (refusals.length > 0) {
		io.error(
			[
				' vis  prune refused. Nothing was deleted.',
				...refusals.map((r) => `   ✗ ${rel(r.path)}: ${r.reason}`),
				'   Remove obsolete baselines with a full `vitest run -u` instead.',
				'',
			].join('\n'),
		)
		return 1
	}

	const lines: string[] = []
	const n = orphans.length
	const noun = `orphaned baseline ${n === 1 ? 'folder' : 'folders'}`
	if (n === 0) lines.push(' vis  No orphaned baseline folders found.')
	else if (dryRun) lines.push(` vis  ${n} ${noun} found. Run without --dry-run to remove ${n === 1 ? 'it' : 'them'}.`)
	else {
		for (const o of orphans) await removeFolder(o)
		lines.push(` vis  ${n} ${noun} removed`)
	}
	lines.push(...orphans.map((o) => `   ↳ ${rel(o.path)}`))
	if (kept.length > 0) {
		lines.push(` vis  ${kept.length} ${kept.length === 1 ? 'folder' : 'folders'} kept:`)
		lines.push(...kept.map((k) => `   - ${rel(k.path)} (${k.reason})`))
	}
	lines.push('')
	io.log(lines.join('\n'))
	return 0
}
