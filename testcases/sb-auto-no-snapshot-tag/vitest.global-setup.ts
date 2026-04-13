import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const testcaseRoot = fileURLToPath(new URL('.', import.meta.url))
const visRoot = join(testcaseRoot, '__vis__')

async function* walk(dir: string): AsyncGenerator<string> {
	try {
		const entries = await readdir(dir, { withFileTypes: true })
		for (const e of entries) {
			const p = join(dir, e.name)
			if (e.isDirectory()) yield* walk(p)
			else yield p
		}
	} catch {
		// missing __vis__ is fine
	}
}

export default function setup() {
	return async function teardown() {
		const snapshots: string[] = []
		for await (const f of walk(visRoot)) {
			if (f.endsWith('.png')) snapshots.push(f)
		}
		if (snapshots.length > 0) {
			throw new Error(
				`Expected no image snapshots when stories lack the snapshot tag (vis.setup({ auto: true })). Found:\n${snapshots.join('\n')}`,
			)
		}
	}
}
