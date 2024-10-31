import { composeStories } from '@storybook/react'
import { assertType } from 'type-plus'
import { expect, it } from 'vitest'
import { page } from './@vitest/browser/context.js'
import { toSnapshotId } from './@vitest/browser/image_snapshot.logic.js'
import * as ToMatchStories from './expect.to_match_image_snapshot.stories.js'
import * as ImageDataStories from './image_data.stories.js'

const { ConversionRoundtrip } = composeStories(ImageDataStories)
const { Success } = composeStories(ToMatchStories)

it('should reject if the subject is undefined', async () => {
	expect(() => expect(undefined).toMatchImageSnapshot()).rejects.toThrowError(
		'`toMatchImageSnapshot()` expects the subject to be an element, locator, or result of `page.imageSnapshot()`, but got: `undefined`',
	)
})

it('should fail if the subject is not an element, locator, or result of page.imageSnapshot()', async () => {
	// TODO: this is not complete.
	// need to handle other cases first.
	try {
		await expect('something').toMatchImageSnapshot()
	} catch (e) {
		expect(e).toBeInstanceOf(Error)
		assertType.as<Error>(e)
		expect(e.message).toEqual(
			'`toMatchImageSnapshot()` expects the subject to be an element, locator, or result of `page.imageSnapshot()`, but got: `something`',
		)
	}
})

it('should fail when the subject is the result of page.screenshot()', async () => {
	await ConversionRoundtrip.run()
	try {
		await expect(page.screenshot({ base64: true })).toMatchImageSnapshot()
	} catch (e) {
		expect(e).toBeInstanceOf(Error)
		assertType.as<Error>(e)
		expect(e.message).toEqual(
			'`toMatchImageSnapshot()` expects the subject to be the result of `page.imageSnapshot()`, but seems like you are using `page.screenshot()`?',
		)
	}
})

it('should work with page.imageSnapshot()', async () => {
	await ConversionRoundtrip.run()
	await expect(page.imageSnapshot()).toMatchImageSnapshot()
})

it('can customize snapshot filename', async ({ task }) => {
	await ConversionRoundtrip.run()
	const result = await page.imageSnapshot({
		customizeFilename(id, index) {
			return `${id}-custom-${index}`
		},
	})
	expect(result.snapshotFilename).toEqual(`${toSnapshotId(task.name)}-custom-1.png`)
})

it('should fail when the subject is a rejected promise', async () => {
	expect(expect(Promise.reject('error')).toMatchImageSnapshot()).rejects.toThrowError('error')
})

it(`should fail with 'Snapshot \`{test/story name}\` mismatched`, async ({ task }) => {
	await ConversionRoundtrip.run()
	await expect(
		page.imageSnapshot({
			customizeFilename: (id) => id,
		}),
	).toMatchImageSnapshot()
	await Success.run()
	try {
		const r = await page.imageSnapshot({
			customizeFilename: (id) => id,
		})
		await expect(r).toMatchImageSnapshot()
		throw new Error('should not reach')
	} catch (e) {
		expect(e).toBeInstanceOf(Error)
		assertType.as<Error>(e)
		await expect(e.message).toMatch(`Snapshot \`${task.name}\` mismatched`)
	}
})
