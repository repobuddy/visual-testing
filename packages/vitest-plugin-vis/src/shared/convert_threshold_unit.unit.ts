import { it } from 'vitest'
import { convertThresholdUnit } from './convert_threshold_unit.ts'

it('throws when type is not supported', ({ expect }) => {
	expect(() =>
		convertThresholdUnit(
			{
				failureThresholdType: 'foo',
			} as any,
			0,
		),
	).toThrowError('Unsupported failureThresholdType: foo')
})

it('keeps the number of pixels for the pixel type', ({ expect }) => {
	expect(convertThresholdUnit({ failureThresholdType: 'pixel', width: 10, height: 10 }, 5)).toBe(5)
})

it('converts the difference to a percentage between 0 and 100 for the percent type', ({ expect }) => {
	expect(convertThresholdUnit({ failureThresholdType: 'percent', width: 10, height: 10 }, 5)).toBe(5)
	expect(convertThresholdUnit({ failureThresholdType: 'percent', width: 10, height: 10 }, 1)).toBe(1)
	expect(convertThresholdUnit({ failureThresholdType: 'percent', width: 10, height: 20 }, 20)).toBe(10)
})
