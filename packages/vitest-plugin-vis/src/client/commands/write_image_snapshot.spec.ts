import { commands } from '@vitest/browser/context'
import { ignoreFailure } from 'never-fail'
import { afterAll, expect, it } from 'vitest'
import { UNI_PNG_BASE64 } from '../../testing.ts'

const fileName = 'write_image_snapshot.tmp'
const relativeFilePath = `src/client/commands/${fileName}`

afterAll(async () => {
	await ignoreFailure(commands.removeFile(fileName))
})

it('write snapshot relative to the project root', async () => {
	await ignoreFailure(commands.removeFile(fileName))
	await commands.writeImageSnapshot(relativeFilePath, UNI_PNG_BASE64)
	const content = await commands.readFile(fileName, { encoding: 'base64' })
	expect(content).toBe(UNI_PNG_BASE64)
})
