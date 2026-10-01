import { afterEach, beforeEach, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { setAutoSnapshotOptions } from '#vitest-plugin-vis'
import { resolveSubject } from './resolve_subject.ts'

beforeEach(() => {
	setAutoSnapshotOptions(false)
})

afterEach(() => {
	for (const el of document.querySelectorAll('[data-resolve-subject]')) el.remove()
})

function addHidden(html: string) {
	const container = document.createElement('div')
	container.setAttribute('data-resolve-subject', '')
	container.style.display = 'none'
	container.innerHTML = html
	document.body.prepend(container)
}

it('returns body when selector is undefined', ({ expect }) => {
	expect(resolveSubject(undefined)).toBe(document.body)
})

it('returns body when selector matches nothing', async ({ expect }) => {
	await render(<div>test</div>)
	expect(resolveSubject('[data-testid="not-exist"]')).toBe(document.body)
})

it('returns the matched element', async ({ expect }) => {
	await render(<button type="button">target</button>)
	expect(resolveSubject('button')?.textContent).toBe('target')
})

it('skips hidden matches before the visible one', async ({ expect }) => {
	addHidden('<table><tr><td><button>Set string</button></td></tr></table>')
	await render(<button type="button">target</button>)
	expect(document.querySelector('button')?.textContent).toBe('Set string')
	expect(resolveSubject('button')?.textContent).toBe('target')
})

it('skips matches with visibility: hidden', async ({ expect }) => {
	await render(
		<>
			<button type="button" style={{ visibility: 'hidden' }}>
				hidden
			</button>
			<button type="button">target</button>
		</>,
	)
	expect(resolveSubject('button')?.textContent).toBe('target')
})

it('throws a clear error when all matches are hidden', async ({ expect }) => {
	addHidden('<button>Set string</button><button>Set string</button>')
	expect(() => resolveSubject('button')).toThrow(
		'Snapshot subject `button` is not visible: it matched 2 element(s), but none of them is visible.',
	)
})
