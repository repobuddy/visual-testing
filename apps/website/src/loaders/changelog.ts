import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { docsLoader } from '@astrojs/starlight/loaders'
import type { Loader } from 'astro/loaders'

export type Changelog = {
	/** Entry id, which is also the page path under the docs root. */
	id: string
	/** Path of the CHANGELOG.md, relative to the repository root. */
	source: string
	title: string
	description: string
	order: number
}

// Sorts after the migration guides, which sit at the default order.
export const changelogs: Changelog[] = [
	{
		id: 'releases/changelog-addon',
		source: 'packages/storybook-addon-vis/CHANGELOG.md',
		title: 'storybook-addon-vis changelog',
		description: 'Release notes for storybook-addon-vis.',
		order: 100,
	},
	{
		id: 'releases/changelog-plugin',
		source: 'packages/vitest-plugin-vis/CHANGELOG.md',
		title: 'vitest-plugin-vis changelog',
		description: 'Release notes for vitest-plugin-vis.',
		order: 101,
	},
]

/** Drops the leading `# ...` heading, since the page title already renders as the H1. */
export function stripTitle(markdown: string): string {
	return markdown.replace(/^\s*# [^\n]*\n+/, '')
}

const repoRoot = new URL('../../../../', import.meta.url)

/**
 * The Starlight docs loader plus the package changelogs, read from the packages at build time so
 * no copy is committed.
 */
export function docsWithChangelogsLoader(): Loader {
	const docs = docsLoader()
	return {
		name: 'docs-with-changelogs',
		async load(context) {
			await docs.load(context)
			for (const changelog of changelogs) {
				const path = fileURLToPath(new URL(changelog.source, repoRoot))
				context.watcher?.add(path)
				const body = stripTitle(await readFile(path, 'utf8'))
				const data = await context.parseData({
					id: changelog.id,
					data: {
						title: changelog.title,
						description: changelog.description,
						editUrl: false,
						sidebar: { order: changelog.order },
					},
				})
				context.store.set({
					id: changelog.id,
					data,
					body,
					filePath: changelog.source,
					digest: context.generateDigest(body),
					rendered: await context.renderMarkdown(body),
				})
			}
		},
	}
}
