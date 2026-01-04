import { it } from 'vitest'
import { prettifyOptions } from './compare_image_snapshot.logic.ts'

it('returns none when no options', ({ expect }) => {
	expect(prettifyOptions(undefined)).toBe('none')
})

it('returns failureThreshold', ({ expect }) => {
	expect(prettifyOptions({ failureThreshold: 0 })).toMatch(/failureThreshold: 0 pixels\s{17}comparisonMethod: pixel/)
	expect(prettifyOptions({ failureThreshold: 0.1, failureThresholdType: 'percent' })).toMatch(
		/failureThreshold: 0.1 percent/,
	)
})

it('returns timeout', ({ expect }) => {
	expect(prettifyOptions({ timeout: 500 })).toMatch(
		/failureThreshold: 0 pixels\s{17}timeout: 500 ms\s{17}comparisonMethod: pixel/,
	)
})

it('stringify diffOptions', ({ expect }) => {
	expect(prettifyOptions({ diffOptions: { threshold: 0.1 } })).toMatch(
		/failureThreshold: 0 pixels\s{17}comparisonMethod: pixel\s{17}diffOptions: {"threshold":0.1}/,
	)
})
