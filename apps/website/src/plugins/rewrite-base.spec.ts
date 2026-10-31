import { describe, expect, it } from 'vitest'
import { rewriteBase, rewriteBasePlugin } from './rewrite-base.ts'

const FROM = '/visual-testing/'
const TO = '/visual-testing/pr-preview/pr-9/'

describe('rewriteBase', () => {
	it.each([
		['/visual-testing/guide/', `${TO}guide/`],
		['/visual-testing/', TO],
		['/visual-testing', '/visual-testing/pr-preview/pr-9'],
		['/visual-testing/storybook/?path=/story/a--b#x', `${TO}storybook/?path=/story/a--b#x`],
		['/visual-testing-other/x', '/visual-testing-other/x'],
		['https://example.com/visual-testing/x', 'https://example.com/visual-testing/x'],
		['#anchor', '#anchor'],
		['../relative', '../relative'],
		['/other/', '/other/'],
	])('%s -> %s', (input, expected) => {
		expect(rewriteBase(input, FROM, TO)).toBe(expected)
	})
	it('is a no-op when the bases are equal', () => {
		expect(rewriteBase('/visual-testing/x', FROM, FROM)).toBe('/visual-testing/x')
	})
})

function run(
	to: string,
	node: any,
	visitor: 'link' | 'image' | 'definition' | 'mdxJsxFlowElement' | 'mdxJsxTextElement',
) {
	const calls: [string, unknown][] = []
	const plugin = rewriteBasePlugin({ to }) as Record<string, any>
	plugin[visitor](node, {
		setProperty: (_n: unknown, key: string, value: unknown) => calls.push([key, value]),
		// MDX JSX attributes cannot be set in place; the plugin swaps in a copy of the node.
		replaceNode: (_n: unknown, next: { attributes: unknown }) => calls.push(['attributes', next.attributes]),
	})
	return calls
}

describe('rewriteBasePlugin', () => {
	it.each(['link', 'image', 'definition'] as const)('rewrites the url of %s nodes', (type) => {
		expect(run(TO, { type, url: '/visual-testing/a/' }, type)).toEqual([['url', `${TO}a/`]])
	})
	it('leaves external and non-matching urls alone', () => {
		expect(run(TO, { url: 'https://x.dev/' }, 'link')).toEqual([])
		expect(run(TO, { url: '/other/' }, 'image')).toEqual([])
	})
	it.each(['mdxJsxFlowElement', 'mdxJsxTextElement'] as const)('rewrites href/src attributes on %s', (type) => {
		const attributes = [
			{ type: 'mdxJsxAttribute', name: 'href', value: '/visual-testing/b/' },
			{ type: 'mdxJsxAttribute', name: 'src', value: '/visual-testing/i.png' },
			{ type: 'mdxJsxAttribute', name: 'title', value: '/visual-testing/untouched' },
			{ type: 'mdxJsxExpressionAttribute', value: '...x' },
		]
		const [[key, value]] = run(TO, { attributes }, type) as [[string, any[]]]
		expect(key).toBe('attributes')
		expect(value.map((a) => a.value)).toEqual([`${TO}b/`, `${TO}i.png`, '/visual-testing/untouched', '...x'])
	})
	it('does nothing when the base is the production base', () => {
		expect(run(FROM, { url: '/visual-testing/a/' }, 'link')).toEqual([])
		expect(
			run(
				FROM,
				{ attributes: [{ type: 'mdxJsxAttribute', name: 'href', value: '/visual-testing/b/' }] },
				'mdxJsxFlowElement',
			),
		).toEqual([])
	})
})
