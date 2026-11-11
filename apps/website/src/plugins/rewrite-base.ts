/**
 * Starlight does not rewrite links inside content, so Markdown/MDX hard-codes the production base
 * (`/visual-testing/...`). When the site is built under another base (for example a PR preview at
 * `/visual-testing/pr-preview/pr-12/`), this Sätteri mdast plugin (Astro 7's default Markdown processor)
 * rewrites link and image URLs, link/image definitions, and `href`/`src` attributes on MDX components
 * (`<LinkCard href="..." />`) that start with the production base. It applies to any content added later.
 *
 * Not covered: frontmatter values (such as `hero.actions[].link`), which never pass through the Markdown pipeline.
 */

export const PRODUCTION_BASE = '/visual-testing/'

const URL_ATTRIBUTES = new Set(['href', 'src'])

/** Rewrites `from` (a base starting and ending with `/`) at the start of `url` to `to`. Other URLs are returned unchanged. */
export function rewriteBase(url: string, from: string, to: string): string {
	if (from === to) return url
	if (url === from.slice(0, -1)) return to.slice(0, -1) || '/'
	if (url.startsWith(from)) return to + url.slice(from.length)
	return url
}

type UrlNode = { url?: string }
type JsxAttribute = { type: string; name?: string; value?: unknown }
type JsxNode = { attributes?: JsxAttribute[] }
type Ctx = { setProperty(node: never, key: string, value: unknown): void; replaceNode(node: never, next: never): void }

export function rewriteBasePlugin(options: { from?: string; to: string }) {
	const from = options.from ?? PRODUCTION_BASE
	const to = options.to

	const url = (node: UrlNode, ctx: Ctx) => {
		if (typeof node.url !== 'string') return
		const next = rewriteBase(node.url, from, to)
		if (next !== node.url) ctx.setProperty(node as never, 'url', next)
	}
	const jsx = (node: JsxNode, ctx: Ctx) => {
		const attributes = node.attributes ?? []
		let changed = false
		const next = attributes.map((attr) => {
			if (
				attr.type !== 'mdxJsxAttribute' ||
				!attr.name ||
				!URL_ATTRIBUTES.has(attr.name) ||
				typeof attr.value !== 'string'
			)
				return attr
			const value = rewriteBase(attr.value, from, to)
			if (value === attr.value) return attr
			changed = true
			return { ...attr, value }
		})
		if (changed) ctx.replaceNode(node as never, { ...node, attributes: next } as never)
	}

	return {
		name: 'rewrite-base',
		link: url,
		image: url,
		definition: url,
		mdxJsxFlowElement: jsx,
		mdxJsxTextElement: jsx,
	}
}
