import { expect, it } from 'vitest'
import { prettifyOptions } from './image_snapshot_matcher.logic.ts'

it('returns none when no options', () => {
	expect(prettifyOptions(undefined)).toBe('none')
})

it('returns failureThreshold', () => {
	expect(prettifyOptions({ failureThreshold: 0 })).toMatch(/failureThreshold: 0 pixels\s{18}comparisonMethod: pixel/)
	expect(prettifyOptions({ failureThreshold: 0.1, failureThresholdType: 'percent' })).toMatch(
		/failureThreshold: 0.1 percent/,
	)
})

it('returns timeout', () => {
	expect(prettifyOptions({ timeout: 500 })).toMatch(
		/failureThreshold: 0 pixels\s{18}timeout: 500 ms\s{18}comparisonMethod: pixel/,
	)
})

it('stringify diffOptions', () => {
	expect(prettifyOptions({ diffOptions: { threshold: 0.1 } })).toMatch(
		/failureThreshold: 0 pixels\s{18}comparisonMethod: pixel\s{18}diffOptions: {"threshold":0.1}/,
	)
})
