import { beforeEach, describe, it } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { setAutoSnapshotOptions } from '#vitest-plugin-vis'
import { ctx } from './expect/_ctx.ts'
import { toTaskId } from './task/task_id.ts'

beforeEach(() => setAutoSnapshotOptions({ enable: false }))

async function capture(text: string, key: string, options: Record<string, unknown>) {
	const { unmount } = await render(
		<div data-testid="subject" style={{ width: 200, padding: 10 }}>
			<div>stable</div>
			<div data-testid="volatile" style={{ background: '#fff', color: '#000' }}>
				{text}
			</div>
		</div>,
	)
	try {
		const info = await (ctx.commands as any).prepareImageSnapshotComparison(
			toTaskId(ctx.getCurrentTest()!),
			page.getByTestId('subject').selector,
			{ snapshotKey: key, ...options },
		)
		return info.result as string
	} finally {
		await unmount()
	}
}

describe('mask', () => {
	it('makes content that differs between runs identical', async ({ expect }) => {
		const a = await capture('first value', 'a', { mask: ['[data-testid="volatile"]'] })
		const b = await capture('second, longer value', 'b', { mask: ['[data-testid="volatile"]'] })
		expect(a).toBe(b)
	})

	it('differs without a mask', async ({ expect }) => {
		const a = await capture('first value', 'c', {})
		const b = await capture('second, longer value', 'd', {})
		expect(a).not.toBe(b)
	})

	it('uses the mask color', async ({ expect }) => {
		const a = await capture('same', 'e', { mask: ['[data-testid="volatile"]'], maskColor: '#ff0000' })
		const b = await capture('same', 'f', { mask: ['[data-testid="volatile"]'] })
		expect(a).not.toBe(b)
	})

	it('ignores a mask that matches nothing', async ({ expect }) => {
		const a = await capture('same', 'g', { mask: ['.missing'] })
		const b = await capture('same', 'h', {})
		expect(a).toBe(b)
	})
})
