import { expect, it } from 'vitest'
import { RESULT_DIR } from '../../../shared/contants.js'
import { page } from './context.js'
import { toSnapshotId } from './image_snapshot.logic.js'

it(`save file under ${RESULT_DIR}`, async ({ task }) => {
	const prefix = task.file.projectName === 'vis:wb' ? 'wb/' : ''
	const f1 = await page.imageSnapshot()
	const filename = task.file.name.slice('src/'.length)
	expect(f1.resultPath).toMatch(`../../../__vis__/${RESULT_DIR}/${prefix}${filename}/${toSnapshotId(task.name)}-1.png`)

	const f2 = await page.imageSnapshot()
	expect(f2.resultPath).toMatch(`../../../__vis__/${RESULT_DIR}/${prefix}${filename}/${toSnapshotId(task.name)}-2.png`)
})
