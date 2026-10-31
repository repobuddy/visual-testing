// Generates the `llms.txt` files for `storybook-addon-vis` and `vitest-plugin-vis`.
//
//   node packages/storybook-addon-vis/scripts/generate-llms-txt.mjs          write the files
//   node packages/storybook-addon-vis/scripts/generate-llms-txt.mjs --check  fail if any file on disk differs
//   node packages/storybook-addon-vis/scripts/generate-llms-txt.mjs --gaps   print the documentation gaps as markdown
//   node packages/storybook-addon-vis/scripts/generate-llms-txt.mjs --site-pages <docs dir>...   fail if a slug has no page file in the given site content dirs
//
// Every name, count and grouping comes from the public surface: the `exports` map of each
// `package.json`, read through the TypeScript compiler API, and the `<Meta title>` of each `.mdx` page.
// Pages link to the documentation site (`SITE_URL`); `SITE_PAGES` maps each source `.mdx` to the Starlight slug(s) that publish it.
// The site-wide file is written to `apps/website/public/llms.txt`, which the website build serves at `<SITE_URL>llms.txt`.
// It also copies the plugin skill (`SKILL.md` and `README.md`) authored in `vitest-plugin-vis` into `storybook-addon-vis`, so both ship the same text.
// The only judgement in here is `DOC_PAGES` (which page documents which declaration), `SITE_PAGES` and `FEATURED_FILES`.
// `DOC_PAGES` is checked at generation time, so a stale entry fails the run.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, posix, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const GENERATOR = 'packages/storybook-addon-vis/scripts/generate-llms-txt.mjs'
const BRANCH = 'main'
const SITE_URL = 'https://repobuddy.github.io/visual-testing/'
const SKILL_FILES = ['SKILL.md', 'README.md'].map((f) => `skills/review-image-snapshot-failures/${f}`)
const TEST_FILE = /\.(spec|test|unit|accept|integrate|system|perf|stress|stories|study)\./

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const stdout = (text) => process.stdout.write(`${text}\n`)
const stderr = (text) => process.stderr.write(`${text}\n`)
const slash = (p) => p.replaceAll('\\', '/')
const read = (rel) => readFileSync(resolve(repoRoot, rel), 'utf8')
const readJson = (rel) => JSON.parse(read(rel))

const PACKAGES = ['storybook-addon-vis', 'vitest-plugin-vis'].map((dir) => {
	const json = readJson(`packages/${dir}/package.json`)
	return {
		dir,
		root: `packages/${dir}`,
		name: json.name,
		description: json.description,
		exports: json.exports,
		peers: json.peerDependencies ?? {},
		optionalPeers: Object.keys(json.peerDependenciesMeta ?? {}),
		repo: json.repository.url,
	}
})
const REPO_URL = PACKAGES[0].repo

const SITE_PACKAGE = PACKAGES[0]
const WEBSITE_LLMS_TXT = 'apps/website/public/llms.txt'

const ADDON = 'packages/storybook-addon-vis/src'
const PLUGIN = 'packages/vitest-plugin-vis/src'

/**
 * Where each source `.mdx` page is published: the Starlight slug(s) under `SITE_DOCS_DIR`, without extension.
 * A page that the site splits into several pages lists one entry per slug, with its own `title` and `summary`;
 * `covers` marks the entry that carries the "Documents:" list of the declarations the source page names.
 * A page with a single slug takes its summary from the source.
 * Every `.mdx` page must be listed here, or the run fails. `--site-pages` checks the slugs against the site's content directory.
 */
const SITE_PAGES = {
	[`${ADDON}/overview.mdx`]: [
		{ slug: 'addon/install', title: 'Install', summary: 'Install storybook-addon-vis and its peer dependencies.' },
		{
			slug: 'addon/setup',
			title: 'Setup',
			summary: 'Configure Storybook, Vitest, TypeScript and .gitignore for storybook-addon-vis.',
			covers: true,
		},
		{
			slug: 'addon/automatic-snapshots',
			title: 'Automatic snapshots',
			summary: 'Take an image snapshot of every story without writing test code.',
		},
		{
			slug: 'addon/manual-snapshots',
			title: 'Manual snapshots',
			summary: 'Take snapshots in a play function, check that one exists, and use the Chrome DevTools Protocol.',
		},
		{
			slug: 'addon/troubleshooting',
			title: 'Troubleshooting',
			summary: 'Fix common installation and runtime problems.',
		},
	],
	[`${ADDON}/reviewing_failures_with_agents.mdx`]: [{ slug: 'guides/reviewing-failures-with-agents' }],
	[`${ADDON}/releases/migrate_to_1.0.mdx`]: [{ slug: 'releases/migrate-to-1' }],
	[`${ADDON}/releases/migrate_to_3.0.mdx`]: [{ slug: 'releases/migrate-to-3' }],
	[`${ADDON}/node/overview.mdx`]: [{ slug: 'reference/addon/node' }],
	[`${ADDON}/node/define_storybook_vis.mdx`]: [{ slug: 'reference/addon/define-storybook-vis' }],
	[`${ADDON}/node/define_storybook_vis_options.mdx`]: [{ slug: 'reference/addon/define-storybook-vis-options' }],
	[`${ADDON}/changelog.mdx`]: [{ slug: 'releases/changelog-addon' }],
	[`${PLUGIN}/overview.mdx`]: [
		{ slug: 'plugin/install', title: 'Install', summary: 'Install vitest-plugin-vis and its peer dependencies.' },
		{
			slug: 'plugin/configuration',
			title: 'Configuration',
			summary: 'Configure Vitest, .gitignore and TypeScript for vitest-plugin-vis.',
			covers: true,
		},
	],
	[`${PLUGIN}/setup/overview.mdx`]: [{ slug: 'reference/plugin/setup/overview' }],
	[`${PLUGIN}/setup/vis.mdx`]: [{ slug: 'reference/plugin/setup/vis' }],
	[`${PLUGIN}/setup/create_vis.mdx`]: [{ slug: 'reference/plugin/setup/create-vis' }],
	[`${PLUGIN}/config/overview.mdx`]: [{ slug: 'reference/plugin/config/overview' }],
	[`${PLUGIN}/config/vis.mdx`]: [{ slug: 'reference/plugin/config/vis' }],
	[`${PLUGIN}/config/trim_common_folder.mdx`]: [{ slug: 'reference/plugin/config/trim-common-folder' }],
	[`${PLUGIN}/auto_snapshots/auto_snapshot_options.mdx`]: [{ slug: 'reference/plugin/set-auto-snapshot-options' }],
	[`${PLUGIN}/client/expect/to_match_image_snapshot.mdx`]: [
		{ slug: 'reference/plugin/matchers/expect-to-match-image-snapshot' },
	],
	[`${PLUGIN}/client/page/to_match_image_snapshot.mdx`]: [
		{ slug: 'reference/plugin/matchers/page-to-match-image-snapshot' },
	],
	[`${PLUGIN}/client/page/has_image_snapshot.mdx`]: [{ slug: 'reference/plugin/matchers/has-image-snapshot' }],
	[`${PLUGIN}/changelog.mdx`]: [{ slug: 'releases/changelog-plugin' }],
}

/** Pages an agent should read first (source `.mdx`). */
const FEATURED_FILES = [`${ADDON}/reviewing_failures_with_agents.mdx`]

/**
 * Which page documents which declaration. Key is `<declaration file, repo-relative>#<name>`
 * (or `<npm package>#<name>` for a type that lives in a dependency).
 * The value is the `.mdx` page (repo-relative), or `null` for "exported, documented nowhere".
 * A non-null page must mention the name, or the run fails.
 * A declaration that is exported but missing here fails the run.
 */
const OVERVIEW = 'packages/storybook-addon-vis/src/overview.mdx'
const DOC_PAGES = {
	'packages/storybook-addon-vis/src/index.ts#default': null,
	'packages/storybook-addon-vis/src/client/vitest_proxy.ts#cdp': OVERVIEW,
	'packages/storybook-addon-vis/src/client/vitest_proxy.ts#page': OVERVIEW,
	'packages/storybook-addon-vis/src/preview/vis_annotation.ts#visAnnotations': OVERVIEW,
	'packages/storybook-addon-vis/src/client/has_image_snapshot.ts#hasImageSnapshot': OVERVIEW,
	'packages/storybook-addon-vis/src/client/storybook/param.ts#defineAutoSnapshotParam': OVERVIEW,
	'packages/storybook-addon-vis/src/client/storybook/tags.ts#isSnapshotEnabled': null,
	'packages/storybook-addon-vis/src/exports/preset.ts#experimental_serverChannel': null,
	'packages/storybook-addon-vis/src/exports/vitest-setup.ts#vis': OVERVIEW,
	'packages/storybook-addon-vis/src/vitest-plugin/storybook_vis.ts#storybookVis': OVERVIEW,
	'packages/storybook-addon-vis/src/node/define_storybook_vis.ts#defineStorybookVis':
		'packages/storybook-addon-vis/src/node/define_storybook_vis.mdx',
	'packages/storybook-addon-vis/src/node/define_storybook_vis_options.ts#defineStorybookVisOptions':
		'packages/storybook-addon-vis/src/node/define_storybook_vis_options.mdx',

	'packages/vitest-plugin-vis/src/auto_snapshots/auto_snapshot_options.ts#setAutoSnapshotOptions':
		'packages/vitest-plugin-vis/src/auto_snapshots/auto_snapshot_options.mdx',
	'packages/vitest-plugin-vis/src/auto_snapshots/auto_snapshot_options.ts#MetaTask': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#Awaitable': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#ImageSnapshotTimeoutOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#ImageSnapshotKeyOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#ComparisonMethod': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#FailureThresholdOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#SsimComparisonOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#PixelComparisonOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#ImageSnapshotCompareOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#ReviewImageOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#ImageSnapshotSubjectOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#ToMatchImageSnapshotOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#PageImageSnapshotOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#ToMatchPageImageSnapshotOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#SnapshotTestMeta': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#ImageSnapshotComparisonInfo': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#MatchImageSnapshotOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#SetupVisOptions': null,
	'ssim.js#SsimDiffOptions': null,
	'packages/vitest-plugin-vis/src/shared/types.ts#PixelDiffOptions': null,
	'packages/vitest-plugin-vis/src/client/actions/has_image_snapshot_action.ts#hasImageSnapshotAction': null,
	'packages/vitest-plugin-vis/src/client/actions/load_image_snapshot_results_action.ts#loadImageSnapshotResultsAction':
		null,
	'packages/vitest-plugin-vis/src/client/actions/match_image_snapshot_action.ts#matchImageSnapshotAction': null,
	'packages/vitest-plugin-vis/src/client/actions/match_page_image_snapshot_action.ts#matchPageImageSnapshotAction':
		null,
	'packages/vitest-plugin-vis/src/client/expect/expectation_result.ts#success': null,
	'packages/vitest-plugin-vis/src/client/expect/to_match_image_snapshot.types.ts#ImageSnapshotMatcher': null,
	'packages/vitest-plugin-vis/src/client/suite/auto_snapshot_matcher.ts#autoSnapshotMatcher': null,
	'packages/vitest-plugin-vis/src/client/task/task_id.ts#toTaskId': null,
	'packages/vitest-plugin-vis/src/shared/constants.ts#NAME': null,
	'packages/vitest-plugin-vis/src/shared/constants.ts#SNAPSHOT_ROOT_DIR': null,
	'packages/vitest-plugin-vis/src/shared/constants.ts#BASELINE_DIR': null,
	'packages/vitest-plugin-vis/src/shared/constants.ts#RESULT_DIR': null,
	'packages/vitest-plugin-vis/src/shared/constants.ts#DIFF_DIR': null,
	'packages/vitest-plugin-vis/src/shared/constants.ts#REVIEW_IMAGE_SUFFIX': null,
	'packages/vitest-plugin-vis/src/shared/constants.ts#CHANGED_REGIONS_SUFFIX': null,
	'packages/vitest-plugin-vis/src/config/types.ts#VisOptions': null,
	'packages/vitest-plugin-vis/src/config/vis.ts#vis': 'packages/vitest-plugin-vis/src/config/vis.mdx',
	'packages/vitest-plugin-vis/src/shared/trim_common_folder.ts#trimCommonFolder':
		'packages/vitest-plugin-vis/src/config/trim_common_folder.mdx',
	'packages/vitest-plugin-vis/src/setup/vis.ts#vis': 'packages/vitest-plugin-vis/src/setup/vis.mdx',
	'packages/vitest-plugin-vis/src/setup/create_vis.ts#createVis': 'packages/vitest-plugin-vis/src/setup/create_vis.mdx',
	'packages/vitest-plugin-vis/src/setup/create_vis.ts#VisClientConfigurator': null,
	'packages/vitest-plugin-vis/src/testing/constants.ts#UNI_PNG_BASE64': null,
	'packages/vitest-plugin-vis/src/testing/constants.ts#UNI_PNG_URL': null,
	'packages/vitest-plugin-vis/src/testing/constants.ts#UNI_IMAGE_DATA': null,
	'packages/vitest-plugin-vis/src/server/snapshot_path.ts#getSnapshotRootDir': null,
	'packages/vitest-plugin-vis/src/server/snapshot_path_limits.ts#resolveLegacySnapshotFileRelativePath': null,
	'packages/vitest-plugin-vis/src/server/snapshot_path_limits.ts#resolveSnapshotSubpathWithinLimits': null,
	'packages/vitest-plugin-vis/src/server/testing/stubSuite.ts#stubSuite': null,
	'packages/vitest-plugin-vis/src/server/vis_options.ts#getVisOption': null,
}

// ---------------------------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------------------------

function listFiles(rel, accept) {
	return readdirSync(resolve(repoRoot, rel), { recursive: true })
		.map(slash)
		.filter((f) => !f.includes('node_modules') && accept(f))
		.sort()
		.map((f) => posix.join(rel, f))
}

/** First plain paragraph of an mdx page, as one sentence. */
function summarize(source) {
	let inFence = false
	const paragraph = []
	for (const raw of source.split(/\r?\n/)) {
		const line = raw.trim()
		if (line.startsWith('```')) {
			inFence = !inFence
			continue
		}
		const plain = !inFence && line && !/^(import |export |<|#|[-*>|]|\d+\.|\[.+\]:)/.test(line)
		if (plain) paragraph.push(line)
		else if (paragraph.length > 0) break
	}
	const text = paragraph
		.join(' ')
		.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/\[([^\]]+)\]/g, '$1')
	const sentence = text.match(/^.*?[.:](?=\s|$)/)?.[0] ?? text
	return sentence.replace(/:$/, '.')
}

const mdxFiles = PACKAGES.flatMap((pkg) =>
	listFiles(`${pkg.root}/src`, (f) => f.endsWith('.mdx')).map((file) => ({ pkg, file })),
)
const unlisted = mdxFiles.filter(({ file }) => !(file in SITE_PAGES)).map(({ file }) => file)
const missing = Object.keys(SITE_PAGES).filter((file) => !mdxFiles.some((m) => m.file === file))
if (unlisted.length > 0 || missing.length > 0) {
	throw new Error(
		`SITE_PAGES in ${GENERATOR} is out of step with the .mdx pages.\n  Not mapped: ${unlisted.join(', ') || 'none'}\n  No such file: ${missing.join(', ') || 'none'}`,
	)
}

const PAGES = mdxFiles.flatMap(({ pkg, file }) => {
	const source = read(file)
	const title = source.match(/<Meta\s+title="([^"]+)"/)?.[1]
	if (!title) throw new Error(`${file} has no <Meta title="..."/>`)
	return SITE_PAGES[file].map((entry) => ({
		pkg,
		file,
		title: entry.title ?? title,
		source,
		slug: entry.slug,
		covers: entry.covers ?? SITE_PAGES[file].length === 1,
		url: `${SITE_URL}${entry.slug}/`,
		summary: entry.summary ?? summarize(source),
	}))
})
const slugs = PAGES.map((p) => p.slug)
const duplicate = slugs.filter((s, i) => slugs.indexOf(s) !== i)
if (duplicate.length > 0) throw new Error(`SITE_PAGES lists a slug twice: ${duplicate.join(', ')}`)
// A source page that is split into several site pages is found by its first entry.
const pageByFile = new Map(PAGES.map((p) => [p.file, p]).reverse())
const isChangelog = (page) => page.slug.startsWith('releases/changelog-')

// ---------------------------------------------------------------------------------------------
// Surface
// ---------------------------------------------------------------------------------------------

/** Entry points of a package, read from its `exports` map. */
function entryPoints(pkg) {
	const entries = []
	for (const [key, value] of Object.entries(pkg.exports)) {
		if (key === './package.json') continue
		const source = value.source
		if (!source) throw new Error(`${pkg.name} export ${key} has no "source" condition`)
		if (!key.includes('*')) {
			entries.push({
				pkg,
				subpath: key === '.' ? pkg.name : `${pkg.name}/${key.slice(2)}`,
				file: slash(posix.join(pkg.root, source)),
			})
			continue
		}
		const [prefix, suffix] = source.replace(/^\.\//, '').split('*')
		const dir = posix.join(pkg.root, prefix)
		for (const file of listFiles(dir, (f) => f.endsWith(suffix) && !TEST_FILE.test(f))) {
			const matched = file.slice(dir.length, file.length - suffix.length)
			const subpath = `${pkg.name}/${key.slice(2).replaceAll('*', matched)}`
			if (!entries.some((e) => e.subpath === subpath)) entries.push({ pkg, subpath, file })
		}
	}
	return entries.sort((a, b) => (a.subpath < b.subpath ? -1 : 1))
}

function createProgram(entries) {
	const configPath = resolve(repoRoot, SITE_PACKAGE.root, 'tsconfig.json')
	const config = ts.getParsedCommandLineOfConfigFile(
		configPath,
		{},
		{
			...ts.sys,
			onUnRecoverableConfigFileDiagnostic(d) {
				throw new Error(ts.flattenDiagnosticMessageText(d.messageText, '\n'))
			},
		},
	)
	const vpv = PACKAGES[1]
	// Read `vitest-plugin-vis` from source, so the result does not depend on a build.
	const options = {
		...config.options,
		paths: {
			[vpv.name]: [resolve(repoRoot, vpv.root, 'src/index.ts')],
			[`${vpv.name}/*`]: [resolve(repoRoot, vpv.root, 'src/exports/*.ts')],
		},
	}
	return ts.createProgram(
		entries.map((e) => resolve(repoRoot, e.file)),
		options,
	)
}

function declarationKey(declaration, name) {
	const file = slash(declaration.getSourceFile().fileName)
	const rootPrefix = `${slash(repoRoot)}/`
	if (file.startsWith(rootPrefix) && !file.includes('/node_modules/')) {
		return { key: `${file.slice(rootPrefix.length)}#${name}`, file: file.slice(rootPrefix.length) }
	}
	const pkgName = file.slice(file.lastIndexOf('/node_modules/') + 14).match(/^(?:@[^/]+\/)?[^/]+/)?.[0]
	if (!pkgName) throw new Error(`Cannot tell where ${name} is declared: ${file}`)
	return { key: `${pkgName}#${name}`, file: pkgName }
}

function kindOf(symbol, name) {
	if (name === 'default') return 'default export'
	const { flags } = symbol
	if (flags & ts.SymbolFlags.Function) return 'function'
	if (flags & (ts.SymbolFlags.TypeAlias | ts.SymbolFlags.Interface)) return 'type'
	if (flags & ts.SymbolFlags.Class) return 'class'
	if (flags & ts.SymbolFlags.Enum) return 'enum'
	return 'value'
}

function collectSurface() {
	const entries = PACKAGES.flatMap(entryPoints)
	const program = createProgram(entries)
	const checker = program.getTypeChecker()
	const unmapped = []
	for (const entry of entries) {
		const sourceFile = program.getSourceFile(resolve(repoRoot, entry.file))
		const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile)
		entry.members = []
		if (!moduleSymbol) continue // a module with no exports, e.g. a side-effect only entry
		for (const exported of checker.getExportsOfModule(moduleSymbol)) {
			const target = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported
			const declaration = target.declarations?.[0] ?? exported.declarations?.[0]
			if (!declaration) throw new Error(`${entry.subpath}: cannot resolve the declaration of ${exported.name}`)
			const { key, file } = declarationKey(declaration, exported.name)
			if (!(key in DOC_PAGES)) {
				unmapped.push(`${entry.subpath} exports ${exported.name} (${key})`)
				continue
			}
			entry.members.push({
				name: exported.name,
				kind: kindOf(target, exported.name),
				key,
				file,
				hasJsDoc: ts.displayPartsToString(target.getDocumentationComment(checker)).length > 0,
				page: DOC_PAGES[key] ? pageByFile.get(DOC_PAGES[key]) : null,
			})
		}
		entry.members.sort((a, b) => (a.name < b.name ? -1 : 1))
	}
	if (unmapped.length > 0) {
		throw new Error(
			`Public surface not covered by DOC_PAGES in ${GENERATOR} (map it to a page, or to null if it is documented nowhere):\n  ${unmapped.join('\n  ')}`,
		)
	}
	const seen = new Set(entries.flatMap((e) => e.members.map((m) => m.key)))
	const stale = Object.keys(DOC_PAGES).filter((k) => !seen.has(k))
	if (stale.length > 0) {
		throw new Error(
			`DOC_PAGES in ${GENERATOR} has entries for declarations that are no longer exported:\n  ${stale.join('\n  ')}`,
		)
	}
	for (const [key, file] of Object.entries(DOC_PAGES)) {
		if (!file) continue
		const page = pageByFile.get(file)
		if (!page) throw new Error(`DOC_PAGES maps ${key} to ${file}, which is not a page`)
		const name = key.slice(key.lastIndexOf('#') + 1)
		if (!new RegExp(`\\b${name}\\b`).test(page.source)) {
			throw new Error(`DOC_PAGES maps ${key} to ${file}, which never mentions ${name}`)
		}
	}
	return { entries, program, checker }
}

/** Value of a string constant declared in the source, e.g. `export const DIFF_DIR = '__diffs__'`. */
function constantValue({ program, checker }, file, name) {
	const sourceFile = program.getSourceFile(resolve(repoRoot, file))
	const symbol = sourceFile && checker.getSymbolAtLocation(sourceFile)?.exports?.get(name)
	const declaration = symbol?.declarations?.[0]
	const type = declaration && checker.getTypeAtLocation(declaration)
	if (!type?.isStringLiteral()) throw new Error(`${file} does not export a string literal ${name}`)
	return type.value
}

// ---------------------------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------------------------

const blob = (file) => `${REPO_URL}/blob/${BRANCH}/${file}`
const npm = (pkg) => `https://www.npmjs.com/package/${pkg.name}`
const join = (items) => items.join(', ')
const byTitle = (a, b) => (a.title < b.title ? -1 : 1)

function summarizeMembers(entry) {
	if (entry.members.length === 0) return 'no named exports; it is imported for its side effects'
	const groups = new Map()
	for (const member of entry.members) {
		const list = groups.get(member.kind) ?? []
		list.push(member.name)
		groups.set(member.kind, list)
	}
	return [...groups]
		.sort(([a], [b]) => (a < b ? -1 : 1))
		.map(([kind, names]) =>
			kind === 'default export' ? kind : `${kind}${names.length > 1 ? 's' : ''}: ${join(names)}`,
		)
		.join('; ')
}

function renderPageList(pages, members) {
	return pages
		.map((page) => {
			const names = page.covers
				? [...new Set(members.filter((m) => m.page?.file === page.file).map((m) => m.name))]
				: []
			const covers = names.length > 0 ? ` Documents: ${join(names)}.` : ''
			return `- [${page.pkg.name}: ${page.title}](${page.url}): ${page.summary}${covers}`
		})
		.join('\n')
}

/** Render the file for a set of packages. */
function render(context, scopePackages) {
	const { entries } = context
	const scoped = entries.filter((e) => scopePackages.includes(e.pkg))
	const members = scoped.flatMap((e) => e.members)

	const referencedFiles = new Set(members.map((m) => m.page?.file).filter(Boolean))
	// Featured pages go in every file: an agent reading either package needs them.
	const pages = PAGES.filter(
		(p) => scopePackages.includes(p.pkg) || referencedFiles.has(p.file) || FEATURED_FILES.includes(p.file),
	)
	const featured = pages.filter((p) => FEATURED_FILES.includes(p.file))
	const docs = pages
		.filter((p) => !featured.includes(p) && !isChangelog(p))
		.sort((a, b) => (a.pkg !== b.pkg ? (a.pkg.name < b.pkg.name ? -1 : 1) : byTitle(a, b)))
	const changelogs = pages.filter(isChangelog).sort((a, b) => (a.pkg.name < b.pkg.name ? -1 : 1))

	const unique = new Map(members.map((m) => [m.key, m]))
	const documented = [...unique.values()].filter((m) => m.page)
	const withJsDoc = [...unique.values()].filter((m) => m.hasJsDoc)

	const names = scopePackages.map((p) => p.name)
	const title = names.join(' and ')
	const summary = scopePackages.map((p) => `${p.name}: ${p.description}`).join('. ')
	const [dirs, baselines, results, diffs, review, regions] = [
		'SNAPSHOT_ROOT_DIR',
		'BASELINE_DIR',
		'RESULT_DIR',
		'DIFF_DIR',
		'REVIEW_IMAGE_SUFFIX',
		'CHANGED_REGIONS_SUFFIX',
	].map((n) => constantValue(context, 'packages/vitest-plugin-vis/src/shared/constants.ts', n))

	const out = []
	out.push(
		`# ${title}`,
		'',
		`> ${summary}. Image snapshot testing for Vitest browser mode, with a Storybook integration. Documentation: ${SITE_URL}`,
		'',
	)
	out.push(
		`This file is generated by \`${GENERATOR}\` from the packages' \`exports\` maps, their source, and the documentation pages. Do not edit it by hand; run \`pnpm docs:llms\` instead.`,
		'',
	)
	if (featured.length > 0) {
		const [page] = featured
		// The page's package ships `src`, so an agent without network access can read it from `node_modules`.
		// Only say so for a package this file covers: the other one may not be installed.
		const shipped = scopePackages.includes(page.pkg)
			? ` Without network access, read it from \`node_modules/${page.pkg.name}/${slash(page.file).slice(page.pkg.root.length + 1)}\`.`
			: ''
		out.push(
			`If an image snapshot test fails, read [${page.title}](${page.url}) before opening any image.${shipped}`,
			'',
		)
	}
	out.push(
		`Image snapshots are stored in the repository under \`${dirs}/\`. Within it, \`${baselines}\` holds the expected images, \`${results}\` holds the images from the latest run, and \`${diffs}\` holds the diff images of failed comparisons. Next to each diff image, \`<name>${review}\` is the review image of the changed regions and \`<name>${regions}\` lists those regions.`,
		'',
		'Import from the entry points listed below, not from package internals. Documentation pages list the names they cover; names without a page have only their type declarations.',
		'',
	)
	if (featured.length > 0) {
		out.push('## Start here', '', renderPageList(featured, members), '')
	}
	out.push('## Packages', '')
	for (const pkg of scopePackages) {
		const peers = Object.entries(pkg.peers).map(
			([name, range]) => `${name} ${range}${pkg.optionalPeers.includes(name) ? ' (optional)' : ''}`,
		)
		out.push(
			`- [${pkg.name}](${npm(pkg)}): ${pkg.description}.${peers.length > 0 ? ` Peer dependencies: ${join(peers)}.` : ''}`,
		)
	}
	out.push('', '## Documentation', '', renderPageList(docs, members), '')
	out.push('## Entry points', '')
	for (const entry of scoped) {
		const count = new Set(entry.members.map((m) => m.key)).size
		const pageCount = new Set(entry.members.filter((m) => m.page).map((m) => m.key)).size
		const counts = count > 0 ? ` (${count} export${count > 1 ? 's' : ''}, ${pageCount} with a documentation page)` : ''
		out.push(`- [\`${entry.subpath}\`](${blob(entry.file)}): ${summarizeMembers(entry)}${counts}.`)
	}
	out.push('', '## Optional', '')
	for (const page of changelogs) {
		out.push(`- [${page.pkg.name}: ${page.title}](${page.url}): Release history of ${page.pkg.name}.`)
	}
	out.push(
		`- [Generator](${blob(GENERATOR)}): Source of this file. Run it with \`--gaps\` to list the undocumented exports.`,
	)
	out.push(
		'',
		`Documentation coverage: ${documented.length} of ${unique.size} distinct exported declarations are named on a documentation page; ${withJsDoc.length} carry a doc comment.`,
	)
	return `${out.join('\n')}\n`
}

// ---------------------------------------------------------------------------------------------
// Gap report
// ---------------------------------------------------------------------------------------------

function renderGaps(context) {
	const { entries } = context
	const unique = new Map(entries.flatMap((e) => e.members).map((m) => [m.key, m]))
	const all = [...unique.values()]
	const undocumented = all.filter((m) => !m.page)
	const noJsDoc = all.filter((m) => !m.hasJsDoc)
	const entriesOfKey = (key) => entries.filter((e) => e.members.some((m) => m.key === key)).map((e) => e.subpath)

	const out = []
	out.push(
		'## Summary',
		'',
		`- ${all.length} distinct exported declarations across ${entries.length} entry points of ${PACKAGES.map((p) => p.name).join(' and ')}.`,
		`- ${undocumented.length} are named on no documentation page (${all.length - undocumented.length} are).`,
		`- ${noJsDoc.length} have no doc comment.`,
		`- ${entries.filter((e) => e.members.length > 0 && e.members.every((m) => !m.page)).length} entry points have no documented export at all, and ${entries.filter((e) => e.members.length === 0).length} export nothing by name.`,
		'',
		'## Entry points',
		'',
		'| Entry point | Exports | On a page | With a doc comment |',
		'| --- | ---: | ---: | ---: |',
	)
	for (const entry of entries) {
		const m = entry.members
		out.push(
			`| \`${entry.subpath}\` | ${m.length} | ${m.filter((x) => x.page).length} | ${m.filter((x) => x.hasJsDoc).length} |`,
		)
	}
	out.push('', '## Undocumented declarations', '')
	const byOwner = new Map()
	for (const m of undocumented) byOwner.set(m.file, [...(byOwner.get(m.file) ?? []), m])
	for (const [file, list] of [...byOwner].sort(([a], [b]) => (a < b ? -1 : 1))) {
		out.push(`### \`${file}\``, '')
		for (const m of list.sort((a, b) => (a.name < b.name ? -1 : 1))) {
			out.push(
				`- \`${m.name}\` (${m.kind}${m.hasJsDoc ? '' : ', no doc comment'}), exported from ${join(entriesOfKey(m.key).map((s) => `\`${s}\``))}`,
			)
		}
		out.push('')
	}
	out.push('## Proposed slicing', '', 'Largest undocumented area first:', '')
	const slices = entries
		.map((e) => ({ subpath: e.subpath, count: new Set(e.members.filter((m) => !m.page).map((m) => m.key)).size }))
		.filter((s) => s.count > 0)
		.sort((a, b) => b.count - a.count || (a.subpath < b.subpath ? -1 : 1))
	slices.forEach((s, i) => {
		out.push(`${i + 1}. \`${s.subpath}\`: ${s.count} undocumented exports`)
	})
	out.push(
		'',
		'Declarations re-exported from several entry points are counted once in the summary, and once per entry point in the slicing, so the slices overlap.',
		'',
		'## Reproduce',
		'',
		'```sh',
		'pnpm docs:llms:gaps',
		'```',
		'',
		`That runs \`${GENERATOR} --gaps\`. The numbers come from the \`exports\` maps read through the TypeScript compiler API, and from the \`<Meta title>\` of each \`.mdx\` page; nothing in this issue is hand-counted.`,
	)
	return `${out.join('\n')}\n`
}

// ---------------------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------------------

const [siteScope, addonScope, pluginScope] = [PACKAGES, [PACKAGES[0]], [PACKAGES[1]]]

const mode = process.argv[2]
const context = collectSurface()

if (mode === '--site-pages') {
	const dirs = process.argv.slice(3)
	if (dirs.length === 0) {
		stderr('Usage: --site-pages <docs dir>... (each relative to the repo root, or absolute)')
		process.exit(2)
	}
	const exists = (slug) =>
		dirs.some((dir) =>
			['.mdx', '.md', '/index.mdx', '/index.md'].some((ext) => existsSync(resolve(repoRoot, dir, `${slug}${ext}`))),
		)
	const absent = PAGES.filter((p) => !exists(p.slug)).map((p) => p.slug)
	if (absent.length > 0) {
		stderr(`Slugs with no page file in ${dirs.join(', ')}:\n  ${absent.join('\n  ')}`)
		process.exit(1)
	}
	stdout(`All ${PAGES.length} slugs have a page file.`)
} else if (mode === '--gaps') {
	process.stdout.write(renderGaps(context))
} else if (mode === undefined || mode === '--check') {
	const outputs = [
		[WEBSITE_LLMS_TXT, render(context, siteScope)],
		[`${SITE_PACKAGE.root}/llms.txt`, render(context, addonScope)],
		[`${PACKAGES[1].root}/llms.txt`, render(context, pluginScope)],
		// The plugin skill is authored once in `vitest-plugin-vis`; `storybook-addon-vis` ships a copy of it.
		...SKILL_FILES.map((file) => [`${PACKAGES[0].root}/${file}`, read(`${PACKAGES[1].root}/${file}`)]),
	]
	if (mode === '--check') {
		const differ = outputs.filter(([file, text]) => {
			const path = resolve(repoRoot, file)
			// A Windows checkout may have converted line endings.
			return !existsSync(path) || readFileSync(path, 'utf8').replaceAll('\r\n', '\n') !== text
		})
		if (differ.length > 0) {
			stderr(`Out of date, run \`pnpm docs:llms\`:\n  ${differ.map(([file]) => file).join('\n  ')}`)
			process.exit(1)
		}
		stdout(`llms.txt is up to date (${outputs.length} files).`)
	} else {
		for (const [file, text] of outputs) {
			mkdirSync(dirname(resolve(repoRoot, file)), { recursive: true })
			writeFileSync(resolve(repoRoot, file), text)
			stdout(`wrote ${file}`)
		}
	}
} else {
	stderr(`Unknown option ${mode}. Use no option, --check, --gaps or --site-pages.`)
	process.exit(2)
}
