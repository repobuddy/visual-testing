import { describe, expect, it } from 'vitest'
import { changelogs, stripTitle } from './changelog.ts'

describe('stripTitle', () => {
	it('removes the leading H1', () => {
		expect(stripTitle('# CHANGE LOG\n\n## 1.0.0\n\n- a\n')).toBe('## 1.0.0\n\n- a\n')
	})

	it('keeps content when there is no H1', () => {
		expect(stripTitle('## 1.0.0\n')).toBe('## 1.0.0\n')
	})

	it('only removes the first heading', () => {
		expect(stripTitle('# a\n\n# b\n')).toBe('# b\n')
	})
})

describe('changelogs', () => {
	it('sit under releases/ with unique ids and orders', () => {
		for (const c of changelogs) expect(c.id).toMatch(/^releases\/changelog-/)
		expect(new Set(changelogs.map((c) => c.id)).size).toBe(changelogs.length)
		expect(new Set(changelogs.map((c) => c.order)).size).toBe(changelogs.length)
	})
})
