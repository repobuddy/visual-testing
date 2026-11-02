# Website

The documentation website is <https://repobuddy.github.io/visual-testing/>.
It is an [Astro](https://astro.build) site with [Starlight](https://starlight.astro.build), in `apps/website`.

## Build

```sh
pnpm exec turbo run build --filter=website
```

The `website` build runs `node scripts/copy-showcase.mjs && astro build && node scripts/copy-storybook.mjs`.
Its `turbo.json` makes it depend on the `build:sb` task of `storybook-addon-vis` and of the `themes`, `multi-instances` and `sb-csf-next` test cases, so the Storybooks are built first.

- `scripts/copy-showcase.mjs` copies the committed baseline images that the Showcase page displays into `public/showcase/`. It fails the build when one is missing.
- `scripts/copy-storybook.mjs` copies the built Storybooks into the output:
  the addon's Storybook (`packages/storybook-addon-vis/storybook-static`) to `/storybook/`,
  and each test case Storybook (`testcases/<name>/storybook-static`) to `/examples/<name>/storybook/`.

The site content is in `apps/website/src/content/docs`.
The package changelogs are not copied there: the loader in `src/loaders/changelog.ts` reads each package's `CHANGELOG.md` and publishes it under `releases/`.

## Deploy

Two workflows publish to the `gh-pages` branch, which is the GitHub Pages source.

- `deploy-pages.yml` runs on every push to `main` (and on `workflow_dispatch`). It builds the site and deploys `apps/website/dist` to the root of `gh-pages` with `JamesIves/github-pages-deploy-action`. It cleans the target but keeps `pr-preview/`, so open previews survive. The deploys run one at a time.
- `pr-preview.yml` runs on every pull request from this repository (not from forks, and not from Dependabot). It builds the site with `SITE_BASE=/visual-testing/pr-preview/pr-<N>/`, publishes it to `pr-preview/pr-<N>/` on `gh-pages` with `rossjrw/pr-preview-action`, and comments the URL on the pull request. The preview is removed when the pull request closes. It has no `paths` filter, so baseline-only pull requests get a preview too.

## `SITE_BASE`

The site is served under `/visual-testing/`.
`SITE_BASE` overrides that base for one build, as the preview workflow does.
`astro.config.mjs` reads it, and `apps/website/turbo.json` lists it in the `env` of the `build` task.

Starlight does not rewrite links inside page content, so pages write links with the production base, for example `/visual-testing/addon/setup/`.
The `rewrite-base` Markdown plugin (`src/plugins/rewrite-base.ts`) rewrites link and image URLs, and `href` and `src` attributes of MDX components, to the actual base.
It does not cover frontmatter values.
`scripts/check-base.mjs <expected-base> [dist-dir]` fails when a built page still links to the production base instead of the expected one.

Old links of the form `<base>?path=...` predate the site. A small script in the site head forwards them to `<base>storybook/?path=...`.

## Add a documentation page

1. Add an `.mdx` file under `apps/website/src/content/docs/<section>/`. It needs `title` and `description` frontmatter. `sidebar.order` sets its position.
2. The sidebar lists the `addon`, `plugin`, `guides`, `examples`, `reference` and `releases` folders automatically (see `astro.config.mjs`). A new top-level folder needs a sidebar entry.
3. Link to other pages with the production base, for example `/visual-testing/plugin/install/`.
4. Embed a story from the published Storybooks with the `Story` component. See `src/components/storybook/README.md`.
5. `llms.txt` links pages through `SITE_PAGES` in `packages/storybook-addon-vis/scripts/generate-llms-txt.mjs`, which maps each source `.mdx` page under `packages/*/src` to its slug(s). A page that exists only on the site, such as Showcase, is not linked from `llms.txt`.

## `llms.txt`

`packages/storybook-addon-vis/scripts/generate-llms-txt.mjs` generates:

- `apps/website/public/llms.txt`, which the site serves at `/llms.txt`,
- `llms.txt` in each package, which ships in the npm package,
- the `review-image-snapshot-failures` skill files in `storybook-addon-vis`, copied from `vitest-plugin-vis` (the skill is authored once).

The names, counts and groupings come from the `exports` maps of the packages and the `<Meta title>` of the source `.mdx` pages. Do not edit the generated files by hand.

| Command | What it does |
| ------- | ------------ |
| `pnpm docs:llms` | Writes the generated files. |
| `pnpm docs:llms:check` | Fails when any generated file differs from what the generator would write. `verify` and `verify:ci` run it. |
| `pnpm docs:llms:gaps` | Prints the undocumented exports as Markdown. |

The generator also has `--site-pages <docs dir>...`, which fails when a registered slug has no page file in the given content directory:

```sh
node packages/storybook-addon-vis/scripts/generate-llms-txt.mjs --site-pages apps/website/src/content/docs
```
