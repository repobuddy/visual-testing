/**
 * Leading and trailing whitespace is trimmed so it does not leak into the snapshot path.
 * e.g. Storybook appends two spaces to the `describe` title it generates for CSF Next `story.test()`.
 */
export function toTaskIdSegment(name: string) {
	return name
		.trim()
		.replace(/[^a-z0-9]/gi, '-')
		.toLowerCase()
}
