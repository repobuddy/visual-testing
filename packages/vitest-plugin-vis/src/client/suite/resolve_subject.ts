/**
 * Resolves the subject element of an auto snapshot from a CSS selector.
 *
 * When the selector matches multiple elements,
 * the first visible one is used,
 * so hidden matches elsewhere in the document (e.g. Storybook's own UI) do not shadow the rendered subject.
 *
 * If the selector is not provided or matches nothing, `document.body` is used.
 * If the selector only matches hidden elements, it throws right away instead of letting the screenshot wait until timeout.
 */
export function resolveSubject(selector: string | undefined): Element {
	if (!selector) return document.body
	const matches = Array.from(document.querySelectorAll(selector))
	if (matches.length === 0) return document.body
	const visible = matches.find(isVisible)
	if (visible) return visible
	throw new Error(
		`Snapshot subject \`${selector}\` is not visible: it matched ${matches.length} element(s), but none of them is visible.`,
	)
}

/**
 * Same definition of visibility as Playwright:
 * the element has a non-empty bounding box and does not have `visibility: hidden`.
 *
 * @see https://playwright.dev/docs/actionability#visible
 */
function isVisible(element: Element) {
	const rect = element.getBoundingClientRect()
	if (rect.width === 0 || rect.height === 0) return false
	return getComputedStyle(element).visibility !== 'hidden'
}
