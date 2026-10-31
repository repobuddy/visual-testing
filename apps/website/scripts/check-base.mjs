// Fails if any href/src in the built HTML starts with the production base without the expected prefix.
// Usage: node scripts/check-base.mjs <expected-base> [dist-dir]
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const expected = process.argv[2]
const dist = process.argv[3] ?? 'dist'
const production = '/visual-testing/'
if (!expected?.startsWith(production) || !expected.endsWith('/')) {
	throw new Error('Pass the expected base, e.g. /visual-testing/pr-preview/pr-1/')
}

const files = []
const walk = (dir) => {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name)
		if (entry.isDirectory()) {
			if (entry.name !== 'storybook') walk(path)
		} else if (path.endsWith('.html')) files.push(path)
	}
}
walk(dist)

const bad = []
let checked = 0
for (const file of files) {
	for (const [, , url] of readFileSync(file, 'utf8').matchAll(/\b(href|src)=(["'])(\/[^"']*)\2/g)) {
		checked++
		if (url.startsWith(production) && !url.startsWith(expected)) bad.push(`${file}: ${url}`)
	}
}
if (bad.length) {
	process.stderr.write(`${bad.length} URL(s) missing the ${expected} prefix:\n${bad.join('\n')}\n`)
	process.exit(1)
}
process.stdout.write(`OK: ${checked} root-relative URLs in ${files.length} HTML files all use ${expected}\n`)
