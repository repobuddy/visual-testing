import { page, server } from '@vitest/browser/context'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { getCurrentTest } from 'vitest/suite'
import { UNI_PNG_BASE64 } from '../../testing/constants.ts'
import { setAutoSnapshotOptions } from '../auto_snapshot_options.ts'
import { ctx } from '../ctx.ts'

beforeEach(() => setAutoSnapshotOptions({ enable: false }))

afterEach(() => ctx.__test__reset())

it('throws when not running in a test', ({ expect }) => {
	ctx.getCurrentTest = () => undefined as any
	expect(() => expect(document.body).toMatchImageSnapshot()).toThrow(
		'`toMatchImageSnapshot()` must be called in a test.',
	)
})

it('throws an error when running in a concurrent test', ({ expect }) => {
	ctx.getCurrentTest = () => ({ concurrent: true }) as any
	expect(() => expect(document.body).toMatchImageSnapshot()).toThrow(
		'`toMatchImageSnapshot()` cannot be called in a concurrent test because ' +
			"concurrent tests run at the same time in the same iframe and affect each other's environment.",
	)
})

it('accepts a Locator', async ({ expect }) => {
	render(<div data-testid="subject">hello</div>)
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot()
})

it('accepts an element', async ({ expect }) => {
	render(<div data-testid="subject">hello</div>)
	const subject = page.getByTestId('subject')
	await expect(subject.element()).toMatchImageSnapshot()
})

it('accepts `document.body`', async ({ expect }) => {
	render(<div data-testid="subject">hello</div>)
	await expect(document.body).toMatchImageSnapshot()
})

it('accepts `baseElement` (same as body)', async ({ expect }) => {
	// the png file created is not valid
	const { baseElement } = render(<div data-testid="subject">hello</div>)
	await expect(baseElement).toMatchImageSnapshot()
})

it('accepts a base64 image', async ({ expect }) => {
	await expect(UNI_PNG_BASE64).toMatchImageSnapshot()
})

it('should fail immediately if the subject is a string but not base64 encoded', async ({ expect }) => {
	await expect(() => expect('abc').toMatchImageSnapshot()).rejects.toThrowError(
		`'toMatchImageSnapshot()' expects the subject to be an element, locator, or image encoded in base64 string, but got: abc`,
	)
})

it.each([undefined, null, true, false, 1])('should fails immediately if the subject is %s', async (value) => {
	const test = getCurrentTest()!
	await test.context
		.expect(() => test.context.expect(value).toMatchImageSnapshot())
		.rejects.toThrowError(
			`'toMatchImageSnapshot()' expects the subject to be an element, locator, or image encoded in base64 string, but got: ${value}`,
		)
})

it('fails when the image is different', async ({ expect }) => {
	const hasImageSnapshot = await page.hasImageSnapshot()
	render(<div data-testid="subject">{hasImageSnapshot ? 'Hello' : 'World'}</div>)
	const subject = page.getByTestId('subject')
	if (!hasImageSnapshot) {
		await expect(subject).toMatchImageSnapshot()
		return
	}
	await expect(subject)
		.toMatchImageSnapshot({
			expectToFail: true,
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/Expected image to match but was differ by \d+ pixels./)
			},
		)
})

it('fails when the image is smaller', async ({ expect }) => {
	const hasImageSnapshot = await page.hasImageSnapshot()
	const style = hasImageSnapshot ? { width: 64, height: 64 } : { width: 128, height: 128 }
	render(
		<div data-testid="subject" style={style}>
			Hello
		</div>,
	)
	const subject = page.getByTestId('subject')
	if (!hasImageSnapshot) {
		await expect(subject).toMatchImageSnapshot()
		return
	}
	await expect(subject)
		.toMatchImageSnapshot({
			expectToFail: true,
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/^Snapshot .* mismatched/)
				expect(error.message).toMatch(/The image size changed from \d{3}x\d{3} to \d{2}x\d{2}/)
			},
		)
})

it('fails when the image is larger', async ({ expect }) => {
	const hasImageSnapshot = await page.hasImageSnapshot()
	const style = hasImageSnapshot ? { width: 128, height: 128 } : { width: 64, height: 64 }
	render(
		<div data-testid="subject" style={style}>
			Hello
		</div>,
	)
	const subject = page.getByTestId('subject')
	if (!hasImageSnapshot) {
		await expect(subject).toMatchImageSnapshot()
		return
	}
	await expect(subject)
		.toMatchImageSnapshot({
			expectToFail: true,
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/^Snapshot .* mismatched/)
				expect(error.message).toMatch(/The image size changed from \d{2}x\d{2} to \d{3}x\d{3}/)
			},
		)
})

it('rejects snapshot key with dash', async ({ expect }) => {
	await expect(() => expect(document.body).toMatchImageSnapshot({ snapshotKey: 'invalid-key' })).rejects.toThrowError(
		'Snapshot key cannot contain dash',
	)
})

it('passes when the image is different but within failure threshold in pixels', async ({ expect }) => {
	render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot({ snapshotKey: 'unit_test' }))) {
		await expect(subject).toMatchImageSnapshot({ snapshotKey: 'unit_test' })
	}
	subject.element().innerHTML = 'unit text'
	await expect(subject).toMatchImageSnapshot({
		snapshotKey: 'unit_test',
		failureThreshold: 70,
	})
})

it('fails when the image is different beyond failure threshold in pixels', async ({ expect, task }) => {
	const isWebdriverIO = /\:wd/.test(task.file.projectName ?? '')
	const failureThreshold = isWebdriverIO ? 5 : 20
	render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot({ snapshotKey: 'unit_test' }))) {
		await expect(subject).toMatchImageSnapshot({ snapshotKey: 'unit_test' })
	}
	subject.element().innerHTML = 'unit text'
	await expect(subject)
		.toMatchImageSnapshot({
			snapshotKey: 'unit_test',
			expectToFail: true,
			failureThreshold,
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(
					new RegExp(`Expected image to match within ${failureThreshold} pixels but was differ by \\d+ pixels.`),
				)
			},
		)
})

it('passes when the image is different but within failure threshold in percentage', async ({ expect }) => {
	render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot({ snapshotKey: 'unit_test' }))) {
		await expect(subject).toMatchImageSnapshot({ snapshotKey: 'unit_test' })
	}
	subject.element().innerHTML = 'unit text'
	await expect(subject).toMatchImageSnapshot({
		snapshotKey: 'unit_test',
		failureThreshold: 1,
		failureThresholdType: 'percent',
	})
})

it('fails when the image is different beyond failure threshold in percentage', async ({ expect, task }) => {
	const isWebdriverIO = /\:wd/.test(task.file.projectName ?? '')
	const failureThreshold = isWebdriverIO ? 0.1 : 0.3
	render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot({ snapshotKey: 'unit_test' }))) {
		await expect(subject).toMatchImageSnapshot({ snapshotKey: 'unit_test' })
	}
	subject.element().innerHTML = 'unit text'
	await expect(subject)
		.toMatchImageSnapshot({
			snapshotKey: 'unit_test',
			expectToFail: true,
			failureThreshold,
			failureThresholdType: 'percent',
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(
					new RegExp(`Expected image to match within ${failureThreshold}% but was differ by \\d+.\\d+%.`),
				)
			},
		)
})

it('fails when the image is different in 0 percentage', async ({ expect }) => {
	render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot({ snapshotKey: 'unit_test' }))) {
		await expect(subject).toMatchImageSnapshot({ snapshotKey: 'unit_test' })
	}
	subject.element().innerHTML = 'unit text'
	await expect(subject)
		.toMatchImageSnapshot({
			snapshotKey: 'unit_test',
			expectToFail: true,
			failureThresholdType: 'percent',
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/Expected image to match but was differ by \d+.\d+%./)
			},
		)
})

it('should fail with additional info when it does not fail with expectToFail', async ({ expect }) => {
	setAutoSnapshotOptions({ enable: false })

	render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot({ snapshotKey: 'unit_test' }))) {
		await expect(subject).toMatchImageSnapshot({ snapshotKey: 'unit_test' })
	}
	const failureThreshold = server.browser === 'chrome' ? 10 : 260
	await expect(subject)
		.toMatchImageSnapshot({
			snapshotKey: 'unit_test',
			expectToFail: true,
			failureThreshold,
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/Snapshot .* matched but expected to fail/)
				expect(error.message).toMatch(/Options:\s+failureThreshold: \d+ pixels/)
				expect(error.message).toMatch(/Diff:\s+\d+ pixels/)
			},
		)
})

describe(`${setAutoSnapshotOptions.name}()`, () => {
	beforeEach(() => setAutoSnapshotOptions({ enable: true }))

	it('can enable auto snapshot from nested beforeEach', () => {
		render(<div>hello</div>)
	})

	it('can disable auto snapshot in test', async ({ expect }) => {
		setAutoSnapshotOptions({ enable: false })
		render(<div>hello</div>)
		expect(await page.hasImageSnapshot()).toBe(false)
	})

	it('does not affect manual snapshot', async ({ expect }) => {
		setAutoSnapshotOptions({ enable: false })
		render(<div>hello</div>)
		await expect(document.body).toMatchImageSnapshot({
			snapshotKey: 'unit_test',
		})
		expect(
			await page.hasImageSnapshot({
				snapshotKey: 'unit_test',
			}),
		).toBe(true)
	})

	it('can enable auto snapshot', () => {
		setAutoSnapshotOptions({ enable: true })
		render(<div>hello</div>)
	})

	it('can take auto snapshot and manual snapshot together', async ({ expect }) => {
		render(<div>hello</div>)
		await expect(document.body).toMatchImageSnapshot()
		expect(
			await page.hasImageSnapshot({
				snapshotKey: '1',
			}),
		).toBe(true)

		// can't validate 2nd snapshot because it's chicken-egg problem
	})
})

describe('ssim', () => {
	beforeEach(() => setAutoSnapshotOptions(false))

	it('can compare image with ssim', async ({ expect }) => {
		render(<div>hello</div>)
		await expect(document.body).toMatchImageSnapshot({
			comparisonMethod: 'ssim',
			snapshotKey: 'unit_test',
		})
	})

	it('fails when the image is different beyond failure threshold in pixels', async ({ expect }) => {
		render(<div data-testid="subject">unit test</div>)
		const subject = page.getByTestId('subject')

		if (!(await page.hasImageSnapshot({ snapshotKey: 'unit_test' }))) {
			await expect(subject).toMatchImageSnapshot({
				comparisonMethod: 'ssim',
				snapshotKey: 'unit_test',
			})
		}
		subject.element().innerHTML = 'unit text'
		await expect(subject)
			.toMatchImageSnapshot({
				comparisonMethod: 'ssim',
				snapshotKey: 'unit_test',
				expectToFail: true,
				failureThreshold: 20,
			})
			.then(
				() => {
					throw new Error('Should not reach')
				},
				(error) => {
					expect(error.message).toMatch(/Expected image to match within 20 pixels but was differ by \d+ pixels./)
				},
			)
	})
})
