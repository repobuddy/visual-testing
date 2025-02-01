import { describe, it } from 'vitest'
import { trimCommonFolder } from './trim_common_folder.ts'

describe(`${trimCommonFolder.name}()`, () => {
	it('should trim "src" from the beginning of the path', ({ expect }) => {
		const result = trimCommonFolder('src/components/button')
		expect(result).toBe('components/button')
	})

	it('should trim "tests" from the beginning of the path', ({ expect }) => {
		const result = trimCommonFolder('tests/unit/button')
		expect(result).toBe('unit/button')
	})

	it('should trim "test" from the beginning of the path', ({ expect }) => {
		const result = trimCommonFolder('test/unit/button')
		expect(result).toBe('unit/button')
	})

	it('should trim "source" from the beginning of the path', ({ expect }) => {
		const result = trimCommonFolder('source/components/button')
		expect(result).toBe('components/button')
	})

	it('should trim "js" from the beginning of the path', ({ expect }) => {
		const result = trimCommonFolder('js/components/button')
		expect(result).toBe('components/button')
	})

	it('should trim "ts" from the beginning of the path', ({ expect }) => {
		const result = trimCommonFolder('ts/components/button')
		expect(result).toBe('components/button')
	})

	it('should trim "lib" from the beginning of the path', ({ expect }) => {
		const result = trimCommonFolder('lib/components/button')
		expect(result).toBe('components/button')
	})

	it('should not trim if no common folder is found', ({ expect }) => {
		const result = trimCommonFolder('app/components/button')
		expect(result).toBe('app/components/button')
	})

	it('should return the same string if it does not contain a slash', ({ expect }) => {
		const result = trimCommonFolder('index.ts')
		expect(result).toBe('index.ts')
	})
})
