// @ts-check

// The page map of docs/proposals/website-organization.md (section 3) as data: one entry per moved page.
// `from` and `to` are page slugs without the base and without slashes at either end, for example
// `addon/install`. The site root is the empty string.
//
// One entry per old URL. Never remove an entry: published llms.txt files and readmes link the old URLs.
// A page that splits into several pages gets one entry, pointing at the page that keeps most of its content.

/** @type {ReadonlyArray<{ from: string, to: string }>} */
export const PAGE_MAP = [
	{ from: 'addon/install', to: 'addon/get-started' },
	{ from: 'addon/setup', to: 'addon/configuration' },
	{ from: 'addon/automatic-snapshots', to: 'addon/guides/automatic-snapshots' },
	{ from: 'addon/manual-snapshots', to: 'addon/guides/manual-snapshots' },
	{ from: 'plugin/install', to: 'plugin/get-started' },
	{ from: 'guides/reviewing-failures-with-agents', to: 'visual-testing/reviewing-failures-with-agents' },
	{ from: 'examples', to: 'addon/examples' },
	{ from: 'examples/themes', to: 'addon/examples/themes' },
	{ from: 'examples/multi-instances', to: 'addon/examples/multi-instances' },
	{ from: 'examples/sb-csf-next', to: 'addon/examples/sb-csf-next' },
	{ from: 'reference/addon/node', to: 'addon/reference/node' },
	{ from: 'reference/addon/define-storybook-vis', to: 'addon/reference/define-storybook-vis' },
	{ from: 'reference/addon/define-storybook-vis-options', to: 'addon/reference/define-storybook-vis-options' },
	{ from: 'reference/plugin/config/overview', to: 'plugin/reference/config/overview' },
	{ from: 'reference/plugin/config/vis', to: 'plugin/reference/config/vis' },
	{ from: 'reference/plugin/config/trim-common-folder', to: 'plugin/reference/config/trim-common-folder' },
	{
		from: 'reference/plugin/matchers/expect-to-match-image-snapshot',
		to: 'plugin/reference/matchers/expect-to-match-image-snapshot',
	},
	{ from: 'reference/plugin/matchers/has-image-snapshot', to: 'plugin/reference/matchers/has-image-snapshot' },
	{
		from: 'reference/plugin/matchers/page-to-match-image-snapshot',
		to: 'plugin/reference/matchers/page-to-match-image-snapshot',
	},
	{ from: 'reference/plugin/set-auto-snapshot-options', to: 'plugin/reference/set-auto-snapshot-options' },
	{ from: 'reference/plugin/setup/create-vis', to: 'plugin/reference/setup/create-vis' },
	{ from: 'reference/plugin/setup/overview', to: 'plugin/reference/setup/overview' },
	{ from: 'reference/plugin/setup/vis', to: 'plugin/reference/setup/vis' },
]
