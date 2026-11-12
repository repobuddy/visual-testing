// Fails if an old URL in the page map has no output page, or if its page does not lead to the new URL.
// Usage: node scripts/check-redirects.mjs [dist-dir] [page-map.json]
// The optional JSON file replaces the page map: an array of { "from": "slug", "to": "slug" }.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PAGE_MAP } from './page-map.mjs'
import { oldUrls } from './redirects.mjs'

const dist = process.argv[2] ?? 'dist'
const map = process.argv[3] ? JSON.parse(readFileSync(process.argv[3], 'utf8')) : PAGE_MAP

const urls = oldUrls(map)
const problems = []
for (const { from, to, file } of urls) {
	const page = join(dist, file)
	if (!existsSync(page)) {
		problems.push(`${from}: no output page (${page})`)
		continue
	}
	// Astro writes a redirect as a page whose meta refresh holds the destination, base included.
	const target = readFileSync(page, 'utf8').match(/http-equiv="refresh"[^>]*content="[^"]*url=([^"]+)"/)?.[1]
	if (!target?.endsWith(to))
		problems.push(`${from}: expected a redirect to ${to}, found ${target ?? 'a page without a redirect'}`)
	else if (!existsSync(join(dist, to === '/' ? '' : to, 'index.html')))
		problems.push(`${from}: target ${to} has no output page`)
}
if (problems.length) {
	process.stderr.write(`${problems.length} old URL(s) with no working output page:\n${problems.join('\n')}\n`)
	process.exit(1)
}
process.stdout.write(`OK: ${urls.length} old URLs in the page map all have an output page in ${dist}\n`)
