import { expect, it } from 'vitest'
import { prettifyOptions } from './match_image_snapshot.logic.ts'

it('returns none when no options', () => {
	expect(prettifyOptions(undefined)).toBe('none')
})

it('returns failureThreshold', () => {
	expect(prettifyOptions({ failureThreshold: 0 })).toBe('failureThreshold: 0 pixel')
	expect(prettifyOptions({ failureThreshold: 0.1, failureThresholdType: 'percent' })).toBe(
		'failureThreshold: 0.1 percent',
	)
})

it('returns timeout', () => {
	expect(prettifyOptions({ timeout: 500 })).toBe('failureThreshold: 0 pixel, timeout: 500 ms')
})

it('returns diffOptions', () => {
	expect(prettifyOptions({ diffOptions: { threshold: 0.1 } })).toBe(
		'failureThreshold: 0 pixel, diffOptions: {"threshold":0.1}',
	)
})
