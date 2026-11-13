import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

/**
 * `storybook-addon-vis` users get `vitest-plugin-vis` only as a dependency of the addon,
 * so its bin is not linked here. Check that the addon's own bin resolves through the package manager.
 */
export default function setup() {
	const out = execFileSync('pnpm', ['exec', 'storybook-addon-vis', 'prune', '--dry-run'], {
		cwd: fileURLToPath(new URL('.', import.meta.url)),
		encoding: 'utf8',
		shell: process.platform === 'win32',
	})
	if (!out.includes(' vis  ')) throw new Error(`Unexpected output from storybook-addon-vis prune --dry-run:\n${out}`)
}
