// @ts-check

// Turns the page map (scripts/page-map.mjs) into the Astro `redirects` option and the list of old URLs.
// astro.config.mjs and scripts/check-redirects.mjs both import it, so they cannot disagree.
import { PAGE_MAP } from './page-map.mjs'

/** @param {string} slug */
const toPath = (slug) => (slug === '' ? '/' : `/${slug}/`)

/**
 * Reject entries that would redirect more than the page they name.
 *
 * - A slug is one literal page. Wildcards, dynamic route segments, query strings and fragments are rejected,
 *   so a redirect matches that page only and never a prefix.
 * - Slugs under or at a `storybook` segment are rejected: `/storybook/` and `/examples/<name>/storybook/` are
 *   static builds that copy-storybook.mjs puts in the output, not pages, and must stay reachable.
 * - A `from` may appear once, must differ from its `to`, and a `to` must not itself be a `from`
 *   (no redirect chains).
 *
 * @param {ReadonlyArray<{ from: string, to: string }>} map
 */
export function validatePageMap(map) {
	const problems = []
	const froms = new Set()
	for (const { from, to } of map) {
		for (const [name, slug] of /** @type {const} */ ([
			['from', from],
			['to', to],
		])) {
			if (typeof slug !== 'string' || slug.startsWith('/') || slug.endsWith('/')) {
				problems.push(`${name} "${slug}": use a slug without a leading or trailing slash`)
			} else if (/[*?#[\]{}]|\.\./.test(slug)) {
				problems.push(`${name} "${slug}": a slug is one literal page, no wildcard, query, fragment or "..".`)
			} else if (slug.split('/').includes('storybook')) {
				problems.push(`${name} "${slug}": storybook paths are static builds, not pages, and cannot be redirected`)
			}
		}
		if (from === to) problems.push(`"${from}" redirects to itself`)
		if (froms.has(from)) problems.push(`"${from}" appears more than once`)
		froms.add(from)
	}
	for (const { from, to } of map) {
		if (froms.has(to)) problems.push(`"${from}" redirects to "${to}", which is itself redirected`)
	}
	if (problems.length) throw new Error(`Invalid page map:\n${problems.join('\n')}`)
}

/**
 * The value for Astro's `redirects` option. Astro matches the keys relative to the site base but writes
 * the destination as given, so the destination gets the base here. `base` ends with a slash.
 *
 * @param {ReadonlyArray<{ from: string, to: string }>} [map]
 * @param {string} [base]
 * @returns {Record<string, string>}
 */
export function buildRedirects(map = PAGE_MAP, base = '/') {
	validatePageMap(map)
	return Object.fromEntries(map.map(({ from, to }) => [toPath(from), `${base}${toPath(to).slice(1)}`]))
}

/**
 * Every old URL the site must keep answering, as the output file each one produces.
 *
 * @param {ReadonlyArray<{ from: string, to: string }>} [map]
 */
export function oldUrls(map = PAGE_MAP) {
	validatePageMap(map)
	return map.map(({ from, to }) => ({
		from: toPath(from),
		to: toPath(to),
		file: `${from ? `${from}/` : ''}index.html`,
	}))
}
