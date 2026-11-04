import { afterEach, describe, expect, it } from 'vitest'
import { settleAnimations } from './settle_animations.ts'

const created: HTMLElement[] = []

function box() {
	const el = document.createElement('div')
	document.body.append(el)
	created.push(el)
	return el
}

afterEach(() => {
	for (const el of created.splice(0)) el.remove()
})

describe(settleAnimations.name, () => {
	it('finishes a finite animation at its end state', async ({ expect }) => {
		const el = box()
		const animation = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 100_000, fill: 'forwards' })
		settleAnimations({ animations: 'disabled' })
		expect(animation.playState).toBe('finished')
		expect(getComputedStyle(el).opacity).toBe('1')
	})

	it('cancels an infinite animation', async ({ expect }) => {
		const el = box()
		const animation = el.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 1000,
			iterations: Number.POSITIVE_INFINITY,
		})
		settleAnimations({ animations: 'disabled' })
		expect(animation.playState).toBe('idle')
	})

	it('finishes a CSS transition', async ({ expect }) => {
		const el = box()
		el.style.transition = 'opacity 100s'
		el.style.opacity = '0'
		getComputedStyle(el).opacity
		el.style.opacity = '1'
		expect(document.getAnimations().length).toBeGreaterThan(0)
		settleAnimations({ animations: 'disabled' })
		expect(getComputedStyle(el).opacity).toBe('1')
		expect(document.getAnimations().filter((a) => a.playState === 'running')).toEqual([])
	})

	it.each([undefined, {}, { animations: 'allow' as const }])('leaves animations running for %o', async (options) => {
		const el = box()
		const animation = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 100_000 })
		settleAnimations(options)
		expect(animation.playState).toBe('running')
	})
})
