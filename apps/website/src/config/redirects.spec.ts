import { describe, expect, it } from 'vitest'
import { buildRedirects, oldUrls, validatePageMap } from '../../scripts/redirects.mjs'
import { packageGroup } from './sidebar.mjs'

describe('buildRedirects', () => {
	it('is empty for an empty map', () => {
		expect(buildRedirects([])).toEqual({})
	})

	it('maps each old page to its new page, with the base left to Astro', () => {
		expect(buildRedirects([{ from: 'addon/install', to: 'addon/get-started' }])).toEqual({
			'/addon/install/': '/addon/get-started/',
		})
	})

	it('puts the site base on the destination only', () => {
		expect(buildRedirects([{ from: 'guides/x', to: 'visual-testing/x' }], '/visual-testing/')).toEqual({
			'/guides/x/': '/visual-testing/visual-testing/x/',
		})
	})

	it('lists the output file of each old URL', () => {
		expect(oldUrls([{ from: 'examples', to: 'addon/examples' }])).toEqual([
			{ from: '/examples/', to: '/addon/examples/', file: 'examples/index.html' },
		])
	})
})

describe('validatePageMap', () => {
	it.each([
		['storybook root', { from: 'storybook', to: 'addon' }],
		['example storybook', { from: 'examples/themes/storybook', to: 'addon/examples/themes' }],
		['wildcard', { from: 'examples/*', to: 'addon/examples' }],
		['slashes', { from: '/addon/install/', to: 'addon/get-started' }],
		['self', { from: 'addon', to: 'addon' }],
	])('rejects %s', (_, entry) => {
		expect(() => validatePageMap([entry])).toThrow('Invalid page map')
	})

	it('rejects duplicates and chains', () => {
		expect(() =>
			validatePageMap([
				{ from: 'a', to: 'b' },
				{ from: 'a', to: 'c' },
			]),
		).toThrow('more than once')
		expect(() =>
			validatePageMap([
				{ from: 'a', to: 'b' },
				{ from: 'b', to: 'c' },
			]),
		).toThrow('itself redirected')
	})
})

describe('packageGroup', () => {
	it('autogenerates the package folder when there are no sub-groups', () => {
		expect(packageGroup({ label: 'Storybook addon', directory: 'addon' }, [])).toEqual({
			label: 'Storybook addon',
			items: [{ autogenerate: { directory: 'addon' } }],
		})
	})

	it('builds the same sub-groups for every package', () => {
		const sub = [{ label: 'Guides', directory: 'guides' }]
		expect(packageGroup({ label: 'Vitest plugin', directory: 'plugin' }, sub).items).toEqual([
			{ autogenerate: { directory: 'plugin' } },
			{ label: 'Guides', autogenerate: { directory: 'plugin/guides' } },
		])
	})
})
