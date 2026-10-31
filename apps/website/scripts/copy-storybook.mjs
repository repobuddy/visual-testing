// Copies the built Storybooks into the site output:
// - the addon's Storybook at <base>/storybook/
// - each testcase Storybook at <base>/examples/<name>/storybook/
import { cp, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = (path) => fileURLToPath(new URL(path, import.meta.url))

const copies = [
	['../../../packages/storybook-addon-vis/storybook-static', '../dist/storybook'],
	...['themes', 'multi-instances', 'sb-csf-next'].map((name) => [
		`../../../testcases/${name}/storybook-static`,
		`../dist/examples/${name}/storybook`,
	]),
]

for (const [from, to] of copies) {
	await rm(root(to), { recursive: true, force: true })
	await cp(root(from), root(to), { recursive: true })
}
