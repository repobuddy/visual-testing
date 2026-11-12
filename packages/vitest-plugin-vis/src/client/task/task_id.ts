type Task = {
	name: string
	suite?: Task | undefined
}

export function toTaskId(task: Task) {
	const l: any[] = []
	let t = task
	while (t?.suite) {
		l.unshift(toTaskIdSegment(t.suite.name))
		t = t.suite
	}

	l.push(toTaskIdSegment(task.name))
	return l.join('/')
}

/**
 * Leading and trailing whitespace is trimmed so it does not leak into the snapshot path.
 * e.g. Storybook appends two spaces to the `describe` title it generates for CSF Next `story.test()`.
 */
function toTaskIdSegment(name: string) {
	return name
		.trim()
		.replace(/[^a-z0-9]/gi, '-')
		.toLowerCase()
}
