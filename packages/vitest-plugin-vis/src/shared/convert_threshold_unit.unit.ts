import { expect, it } from 'vitest'
import { convertThresholdUnit } from './convert_threshold_unit.ts'

it('throws when type is not supported', () => {
	expect(() =>
		convertThresholdUnit(
			{
				failureThresholdType: 'foo',
			} as any,
			0,
		),
	).toThrowError('Unsupported failureThresholdType: foo')
})
