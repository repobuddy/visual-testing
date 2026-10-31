import { describe, expect, it } from 'vitest'
import { buildIframeUrl, buildStoryLinkUrl, normalizeBase, serializeStoryParam, titleFromId } from './story-url.ts'

describe('normalizeBase', () => {
	it.each([
		['/visual-testing/', '/visual-testing/'],
		['/visual-testing', '/visual-testing/'],
		['visual-testing', '/visual-testing/'],
		['//visual-testing//', '/visual-testing/'],
		['/', '/'],
		['', '/'],
		[undefined, '/'],
		['/a/b', '/a/b/'],
	])('%j -> %s', (input, expected) => {
		expect(normalizeBase(input)).toBe(expected)
	})
})

describe('buildIframeUrl', () => {
	it.each(['/visual-testing/', '/visual-testing'])('does not double slashes for base %s', (base) => {
		expect(buildIframeUrl({ base, id: 'a--b' })).toBe('/visual-testing/storybook/iframe.html?id=a--b&viewMode=story')
	})
	it('works at the site root', () => {
		expect(buildIframeUrl({ base: '/', id: 'a--b' })).toBe('/storybook/iframe.html?id=a--b&viewMode=story')
	})
	it('supports a custom storybook path', () => {
		expect(buildIframeUrl({ base: '/x/', storybookPath: '/sb/', id: 'a--b' })).toBe(
			'/x/sb/iframe.html?id=a--b&viewMode=story',
		)
	})
	it('encodes ids with special characters', () => {
		const url = buildIframeUrl({ base: '/', id: 'a b&c=d--e/f?' })
		expect(url).toBe('/storybook/iframe.html?id=a+b%26c%3Dd--e%2Ff%3F&viewMode=story')
		expect(new URL(url, 'http://x').searchParams.get('id')).toBe('a b&c=d--e/f?')
	})
	it('serialises and encodes args and globals', () => {
		const url = buildIframeUrl({
			base: '/',
			id: 'a--b',
			args: { label: 'Hello World', n: 3, on: true },
			globals: { theme: 'dark' },
		})
		const params = new URL(url, 'http://x').searchParams
		expect(params.get('args')).toBe('label:Hello World;n:3;on:!true')
		expect(params.get('globals')).toBe('theme:dark')
		expect(url).toContain('args=label%3AHello+World%3Bn%3A3%3Bon%3A%21true')
	})
	it('omits empty args and globals', () => {
		expect(buildIframeUrl({ base: '/', id: 'a--b', args: {}, globals: {} })).not.toMatch(/args|globals/)
	})
})

describe('serializeStoryParam', () => {
	it('handles null, undefined, nested objects and arrays', () => {
		expect(serializeStoryParam({ a: null, b: undefined, c: { d: 1, e: ['x', 'y'] } })).toBe(
			'a:!null;b:!undefined;c.d:1;c.e[0]:x;c.e[1]:y',
		)
	})
	it('rejects strings Storybook would silently drop', () => {
		expect(() => serializeStoryParam({ a: 'x;y' })).toThrow(RangeError)
		expect(() => serializeStoryParam({ a: 'x:y' })).toThrow(RangeError)
	})
	it('rejects bad keys and non-finite numbers', () => {
		expect(() => serializeStoryParam({ 'a;b': 1 })).toThrow(RangeError)
		expect(() => serializeStoryParam({ a: Number.NaN })).toThrow(RangeError)
	})
})

describe('buildStoryLinkUrl', () => {
	it.each(['/visual-testing/', '/visual-testing'])('links to the full UI for base %s', (base) => {
		expect(buildStoryLinkUrl({ base, id: 'a--b' })).toBe('/visual-testing/storybook/?path=/story/a--b')
	})
	it('encodes special characters but keeps slashes', () => {
		expect(buildStoryLinkUrl({ base: '/', id: 'a b&c--d' })).toBe('/storybook/?path=/story/a%20b%26c--d')
	})
})

describe('titleFromId', () => {
	it('derives a title', () => {
		expect(titleFromId('auto-snapshot--capture-subject-only')).toBe('auto snapshot: capture subject only')
		expect(titleFromId('solo')).toBe('solo')
	})
})
