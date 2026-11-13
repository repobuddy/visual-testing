import { toTaskIdSegment } from '../../shared/task_id_segment.ts'

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
