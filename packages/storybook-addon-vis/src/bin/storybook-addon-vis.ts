#!/usr/bin/env node
// Resolves `vitest-plugin-vis` from this package's own dependency,
// so the command always matches the plugin version the addon runs with.
import { runCli } from 'vitest-plugin-vis/cli'

process.exitCode = await runCli(process.argv.slice(2), {
	cwd: process.cwd(),
	name: 'storybook-addon-vis',
	log: (m) => process.stdout.write(`${m}\n`),
	error: (m) => process.stderr.write(`${m}\n`),
})
