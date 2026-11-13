#!/usr/bin/env node
import { runCli } from '../server/prune_cli.ts'

process.exitCode = await runCli(process.argv.slice(2), {
	cwd: process.cwd(),
	log: (m) => process.stdout.write(`${m}\n`),
	error: (m) => process.stderr.write(`${m}\n`),
})
