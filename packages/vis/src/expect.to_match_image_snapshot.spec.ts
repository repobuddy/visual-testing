import { composeStories } from '@storybook/react'
import { assertType } from 'type-plus'
import { expect, it } from 'vitest'
import { page } from './@vitest/browser/context.js'
import * as ImageDataStories from './image_data.stories.js'

const { ConversionRoundtrip, Failed } = composeStories(ImageDataStories)

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

it('should pass when the image matches', async () => {
	await ConversionRoundtrip.run()
	await expect(page.imageSnapshot()).toMatchImageSnapshot()
})

it('should fail when the image does not match', async () => {
	await Failed.run()
	const result = await page.imageSnapshot()
	await expect(result)
		.toMatchImageSnapshot()
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => expect(error.message).toMatch(/Expected image to match but was differ by \d+ pixels./),
		)
})
