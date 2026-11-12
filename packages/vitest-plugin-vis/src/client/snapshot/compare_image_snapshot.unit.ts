import { describe, it } from 'vitest'
import { formatSnapshotPath, prettifyOptions } from './compare_image_snapshot.logic.ts'

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

describe('formatSnapshotPath', () => {
	it('formats a path within the project root as a relative path', ({ expect }) => {
		expect(formatSnapshotPath('/home/me/project', '__vis__/local/__baselines__/some.spec.tsx/case-1.png')).toBe(
			'./__vis__/local/__baselines__/some.spec.tsx/case-1.png',
		)
	})

	it('does not leak the project root of an absolute path within the project', ({ expect }) => {
		expect(formatSnapshotPath('/home/me/project', '/home/me/project/__vis__/local/case-1.png')).toBe(
			'./__vis__/local/case-1.png',
		)
	})

	it('keeps a path outside the project root absolute', ({ expect }) => {
		expect(formatSnapshotPath('/home/me/project/packages/app', '../../__vis__/local/case-1.png')).toBe(
			'/home/me/project/__vis__/local/case-1.png',
		)
	})

	it('keeps the project root itself absolute', ({ expect }) => {
		expect(formatSnapshotPath('/home/me/project', '.')).toBe('/home/me/project')
	})

	it('does not mistake a leading dot-dot in a filename for an escape', ({ expect }) => {
		expect(formatSnapshotPath('/home/me/project', '..vis/case-1.png')).toBe('./..vis/case-1.png')
	})
})
