import type { AnimationsOptions } from '../../shared/types.ts'

/**
 * Finish finite CSS animations and transitions and cancel infinite ones,
 * the same way Playwright does for `animations: 'disabled'`.
 * Does nothing when `animations` is not `'disabled'`.
 */
export function settleAnimations(options: AnimationsOptions | undefined, doc: Document = document) {
	if (options?.animations !== 'disabled') return
	for (const animation of doc.getAnimations()) {
		const { iterations } = animation.effect?.getComputedTiming() ?? {}
		if (iterations === Number.POSITIVE_INFINITY) animation.cancel()
		else animation.finish()
	}
}
