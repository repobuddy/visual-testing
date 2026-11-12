import type { MaskLocator } from '../shared/types.ts'
import { convertElementToCssSelector } from './external/browser/selector.ts'

/**
 * Converts the entries of the `mask` option to CSS selectors,
 * since locators and elements cannot be sent to the server.
 */
export function normalizeMask(mask: Array<string | MaskLocator | Element> | undefined): string[] | undefined {
	if (!mask) return undefined
	if (!Array.isArray(mask)) throw new Error(`'mask' must be an array of selectors, locators, or elements.`)
	return mask.map((entry) => {
		if (typeof entry === 'string') return entry
		if (typeof Element !== 'undefined' && entry instanceof Element) return convertElementToCssSelector(entry)
		if (typeof (entry as MaskLocator)?.selector === 'string') return (entry as MaskLocator).selector
		throw new Error(`'mask' expects each entry to be a selector, locator, or element, but got: ${entry}`)
	})
}

export function normalizeMaskOptions(options: { mask?: any } | undefined): any {
	if (!options?.mask) return options
	return { ...options, mask: normalizeMask(options.mask) }
}
