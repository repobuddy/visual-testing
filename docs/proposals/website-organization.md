# Design record: organize the visual-testing website

Thread `vt-site-ia`. Status: Decided 2026-11-03. This is the design the build pods start from. Nothing on the site has been moved or rewritten yet; the build begins at stage 1 once stage 0 clears. Written against `main` at #976.

See [Website](../website.md) for how the site is built and how pages are added.

The ask: the site should talk about visual testing as a whole, give each package a clear structure, go deep into each package's features, and say how each compares with other solutions.

## 1. Diagnosis

The site has 28 content pages. Most of the text is reference, plus one long page (Showcase). What is missing is the middle: concepts, guides and comparisons. Recent work (#973, #974, #976) corrected existing claims and added a Storybooks group, but changed no structure.

1. **Visual testing as a whole has no home.** The only shared pages are the landing page, Showcase and one guide (agent review). Baselines, the `__vis__/<platform>/__baselines__|__results__|__diffs__` layout, pixel vs SSIM, thresholds, platform and CI differences, and the update workflow (`docs/snapshot-workflow.md`, which is repo-internal) are explained nowhere, or only inside reference pages for one option.
2. **Packages are organized by different rules.** The addon has install, setup (about 400 lines, 8 topics in one page), automatic, manual, troubleshooting. The plugin has install and configuration only. The plugin has no automatic-snapshots page and no manual-snapshots page: its guides are `reference/plugin/matchers/*` and `set-auto-snapshot-options`. Its install page carries the only comparison on the site (against Vitest's native visual regression).
3. **Reference is the only deep layer, and it is deep in the wrong places.** Plugin config/vis is 304 lines and `toMatchImageSnapshot` 314, while thresholds, SSIM, review image, timeout and `shortenLongSnapshotPaths` are options buried as sections in those pages. A reader who wants "how do I tolerate small diffs" must know to open `reference/plugin/config/vis`.
4. **Documented API coverage is low.** `llms.txt` reports 11 of 34 addon declarations and 5 of 50 plugin declarations on a page. Entry points with no page: `vitest-plugin-vis/client-api`, `presets/auto`, `presets/manual`, `server-utils`, `testing`, `testing/node`, and `storybook-addon-vis/{manager,matcher,preset}`. The `presets/auto` and `presets/manual` entry points are how a plugin user turns on automatic snapshots, and nothing explains the choice.
5. **Features exist that no page presents as a feature:** per-theme snapshots, per-viewport snapshots (multi-instances), the Vis panel and its failed-snapshot compare view (shipped in #970), review images and `.regions.json`, the `review-image-snapshot-failures` agent skill, `llms.txt`, `hasImageSnapshot`, CDP use, `createMissingBaseline` vs `updateSnapshot`, CSF Next and `story.test()`. Several appear only on Showcase, as pictures.
6. **Cross-package duplication and drift.** The addon re-exports the plugin (`export * from 'vitest-plugin-vis'`), so options such as thresholds belong to both, yet they are documented under the plugin only. `setAutoSnapshotOptions` is exported by both packages and documented once.
7. **Examples are Storybook-only.** Three example pages (themes, multi-instances, CSF Next) cover the addon. Nine other test cases show scenarios nobody can find from the site: `vpv` (plugin without Storybook), `workspace` (several vitest configs), `sb-csf-3`, `sb-csf-mix`, `sb-control`, `sb-auto-no-snapshot-tag`, `react-vite-ts`, `showcase`.
8. **Storybooks are a flat bolt-on.** #976 added a "Storybooks" sidebar group (links to `/storybook/` and three `/examples/<name>/storybook/` builds), a Storybooks section on the landing page, and an extra column on the Examples index. They are useful but sit beside the package sections instead of under them, and the sidebar now has two groups about examples.
9. **No positioning.** The site never says when to choose this over Playwright's `toHaveScreenshot`, Vitest 4's native `toMatchScreenshot`, Chromatic, Lost Pixel, Percy, or the Storybook test-runner with `jest-image-snapshot`.

## 2. Structure

Two package sections with identical shape, a whole-topic section above them, and a compare section. Diátaxis is the lens: Concepts is explanation, Guides is how-to, Get started is tutorial, API reference is reference.

```
Start
  Introduction                     (landing: both packages, which one, links, Storybooks)
  Showcase                         (kept, trimmed to pictures and links into Concepts)
Visual testing                     (the whole topic, package-neutral)
  What is visual testing
  How snapshots work               (baseline, result, diff; the __vis__ layout)
  Comparison and thresholds        (pixel vs SSIM, failure thresholds, per-test overrides)
  Platforms and CI                 (per-platform baselines, Linux vs Windows, CI recipe)
  Updating baselines               (createMissingBaseline, updateSnapshot, review flow)
  Reviewing failures               (review image, regions.json, Vis panel, git diff)
  Reviewing failures with agents   (the existing guide, moved)
  Variations                       (themes, viewports, browsers: the idea, not the setup)
  Choosing a package
Storybook addon                    (storybook-addon-vis)
  Get started                      (install + 5-minute first snapshot)
  Guides
    Automatic snapshots
    Manual snapshots
    Themes
    Viewports and multiple instances
    CSF Next and story.test()
    The Vis panel
    Thresholds and comparison for stories
    Reviewing failures (addon view)
    Monorepos and custom snapshot paths
    CI
  Configuration                    (Storybook, Vitest, TypeScript, .gitignore; split from setup)
  Features                         (one page: every capability, each linking to its guide)
  Examples                         (page per example; links to its published Storybook)
  Troubleshooting
  API reference
Vitest plugin                      (vitest-plugin-vis)
  Get started                      (install + first snapshot with page and expect)
  Guides
    Automatic snapshots            (presets/auto)
    Manual snapshots               (presets/manual, toMatchImageSnapshot)
    Full-page and viewport snapshots
    Themes
    Viewports and multiple instances
    Thresholds and comparison
    Masking and element subjects   (status of masking: see Q5)
    Workspaces and multiple configs
    Reviewing failures
    CI
  Configuration
  Features
  Examples
  Troubleshooting
  API reference
Compare
  Overview                         (a matrix of all tools)
  vs Vitest visual regression      (moved from plugin install)
  vs Playwright visual comparisons
  vs Storybook test-runner + jest-image-snapshot
  vs Chromatic
  vs Lost Pixel
Storybooks                         (the #976 group, kept: /storybook/ and the example builds)
Releases                           (unchanged)
```

The Storybooks group stays a top-level group of explicit links, because those are static builds, not Astro pages. It moves below Compare and stays out of the package sections. Each example page under `/addon/examples/` links to its Storybook, so the group is a shortcut, not the only way in.

Rules that give every fact one home:

- **Concept lives in Visual testing; setup lives in a package.** "What a threshold is and how pixel differs from SSIM" is written once under Visual testing. Each package's threshold guide shows only the call or config for that package and links to the concept.
- **Options live in API reference.** Guides state the task and show a working example. The option table is in reference only.
- **Shared options belong to the plugin reference.** The addon re-exports them, so the addon reference links to the plugin entry instead of copying it. The addon reference documents only what the addon adds (`defineStorybookVis`, `defineStorybookVisOptions`, `visAnnotations`, `storybookVis`, `defineAutoSnapshotParam`, `isSnapshotEnabled`, the preset and manager).
- **A comparison fact lives in Compare.** Package pages say what the package does and link to Compare. Competitor claims are written only from the competitor's current documentation, each with a link (Q4 in section 6).
- **Features page is an index, not a manual.** One table per package: feature, one line, link to its guide. This is the "go deep" entry point and the page the landing page links to.

Depth is carried by the guides: each is a task page (goal, minimal code, what appears on disk, a Showcase or Storybook picture, the options that matter, link to reference). A feature is not "documented" until it has a guide and a row on Features.

Sidebar mechanics: `astro.config.mjs` lists each group by `autogenerate: { directory }`. The new tree needs explicit nested groups for Guides and API reference, so replace the six autogenerate blocks with a small helper that builds the same sub-groups for `addon` and `plugin` from one definition. Parallelism is then enforced in code.

## 3. Page map

Actions: keep, move, merge, split, cut, new. Source: where the content is written from.

### Existing pages

| Current page | Action | New location | Notes |
| --- | --- | --- | --- |
| `index` | keep, edit | `/` | Add the Visual testing and Compare links; keep the package table and the #976 Storybooks section; its "Which one do I need" text moves to Choosing a package, leaving a link. |
| `showcase` | keep, trim | `/showcase/` | Move prose about thresholds and review into Visual testing pages; keep the pictures and link to them. |
| `addon/index` | keep, rewrite | `/addon/` | Becomes a short overview that points to Get started and Features. |
| `addon/install` | merge | `/addon/get-started/` | Joined with a first-snapshot walk-through. |
| `addon/setup` (410 lines) | split | `/addon/configuration/`, plus `/addon/guides/themes`, `/addon/guides/monorepo-and-paths`, `/addon/guides/csf-next` | Basic setup, Storybook 10.3+ annotations, gitignore, TypeScript, global API stay in Configuration. "Basic Setup for CSF Next" and "Multiple projects or custom snapshot paths" become guides. `createMissingBaseline` vs `updateSnapshot` moves to Visual testing / Updating baselines and is linked back. |
| `addon/automatic-snapshots` | move | `/addon/guides/automatic-snapshots/` | |
| `addon/manual-snapshots` | move, split | `/addon/guides/manual-snapshots/`, `/addon/guides/chrome-devtools-protocol/` | CDP section becomes its own short guide. |
| `addon/troubleshooting` | keep | `/addon/troubleshooting/` | |
| `plugin/install` | split | `/plugin/get-started/`, `/compare/vitest-visual-regression/` | The feature table and Vitest 4 comparison move to Compare. |
| `plugin/configuration` | keep | `/plugin/configuration/` | |
| `guides/reviewing-failures-with-agents` | move | `/visual-testing/reviewing-failures-with-agents/` | Name the page in `generate-llms-txt.mjs`; both packages' `llms.txt` link to it. |
| `examples/index`, `themes`, `multi-instances`, `sb-csf-next` | move | `/addon/examples/...` | Examples are Storybook builds. Published Storybook paths (`/examples/<name>/storybook/`) do not change, so the Storybook column added in #976 keeps its links. |
| Sidebar group "Storybooks" (#976, config only) | keep | top-level group | Links stay as they are. |
| `reference/addon/node` | move | `/addon/reference/node/` | |
| `reference/addon/define-storybook-vis`, `define-storybook-vis-options` | move | `/addon/reference/...` | |
| `reference/plugin/config/*` (`overview`, `vis`, `trim-common-folder`) | move; trim | `/plugin/reference/config/...` | Move the Failure thresholds, Review image, Timeout sections into guides and keep a one-line option entry plus link. |
| `reference/plugin/matchers/*` (3 pages) | move; trim | `/plugin/reference/matchers/...` | Task-style examples become guides. |
| `reference/plugin/set-auto-snapshot-options` | move | `/plugin/reference/set-auto-snapshot-options/` | |
| `reference/plugin/setup/*` (3 pages) | move | `/plugin/reference/setup/...` | The multi-theme sections in `setup/vis` become the plugin Themes guide, linked back. |
| `releases/*` | keep | unchanged | Generated from changelogs. |

### New pages

| New page | Outline | Written from |
| --- | --- | --- |
| Visual testing / What is visual testing | The idea, what it catches and misses, the loop (write, snapshot, compare, review, update). | New prose; Showcase. |
| How snapshots work | Baseline, result, diff; the `__vis__/<platform>/` tree; what is committed and ignored; review image and regions file. | `server-utils` constants (`BASELINE_DIR`, `RESULT_DIR`, `DIFF_DIR`, `REVIEW_IMAGE_SUFFIX`), `llms.txt` intro, `testcases/*/__vis__`. |
| Comparison and thresholds | Pixel vs SSIM, absolute and percentage thresholds, pixel-perfect, how to choose. | `shared/types.ts`; threshold sections of `config/vis` and Showcase. |
| Platforms and CI | Why baselines differ by OS, `linux/` and `win32/`, how to keep them in CI, example workflow. | `docs/snapshot-workflow.md` (generalized), `.github/workflows`. |
| Updating baselines | `createMissingBaseline`, `updateSnapshot`, `vitest -u`, review before merge, bot PRs. | `addon/setup` section, `snapshot-workflow.md`. |
| Reviewing failures | Reading a failure: result, diff, review image, regions; the Vis compare view; where agents fit. | #970 Vis panel work, Showcase "Reviewing a failure". |
| Variations | Themes, viewports and multiple instances as an idea; when each pays off. | `testcases/themes`, `multi-instances`. |
| Choosing a package | Decision table and flowchart: Storybook or not; what the addon adds over the plugin; can you use both. | `index` "Which one do I need", package manifests. |
| Addon / Features and Plugin / Features | Table of capabilities with links. | Exports, option types, Showcase. |
| Addon guides: Themes, Viewports and multiple instances, The Vis panel, Thresholds, Reviewing failures, CI | Task pages as described in section 2. | `testcases/themes`, `multi-instances`, `manager.tsx`, `defineStorybookVis` options. |
| Addon guide: CSF Next and `story.test()` | Moved from setup plus a worked example. | `testcases/sb-csf-next`, `sb-csf-mix`, `sb-csf-3`. |
| Addon reference: Visual panel, `visAnnotations`, `storybookVis`, `defineAutoSnapshotParam`, `hasImageSnapshot`, `isSnapshotEnabled`, preset and manager entry | One page per public name, signature, options, example. | `src/index.ts`, `src/exports/*`. |
| Plugin / Get started | Install plus first test using `page.toMatchImageSnapshot` and `expect(el).toMatchImageSnapshot`. | `testcases/vpv`. |
| Plugin guides: Automatic snapshots, Manual snapshots, Full-page snapshots, Themes, Viewports, Thresholds, Workspaces, Reviewing failures, CI | Task pages. | `presets/auto`, `presets/manual`, `testcases/vpv`, `workspace`, `multi-instances`, `themes`. |
| Plugin guide: Masking and element subjects | Subject options and what is supported. | `ImageSnapshotSubjectOptions`; masking is marked as planned in the current comparison table (Q5). |
| Plugin reference: `client-api`, `presets/auto`, `presets/manual`, `server-utils`, `testing` | Entry-point pages for the undocumented exports. | `src/exports/*`. |
| Plugin / Examples | `vpv` and `workspace` scenarios as walkthroughs. | `testcases/vpv`, `workspace`. |
| Plugin / Troubleshooting | Mirror of the addon page: peer dependency range, provider choice (playwright or webdriverio), missing baselines. | Package peer dependencies, issues. |
| Compare / Overview | Matrix: where it runs, automatic snapshots, themes, viewports, comparison methods, thresholds, masking, review UI, hosting (local files or cloud), cost, CI integration. One row per tool. | Each tool's own documentation, cited per cell. |
| Compare / vs Playwright, Storybook test-runner, Chromatic, Lost Pixel | Each: what it is, what it does better, what this does better, when to choose it, how to migrate. | Same. |
| Compare / vs Vitest visual regression | The current table plus the same four sections. | Moved from plugin install. |

## 4. URL impact

Today's URLs are stable for the published Storybooks (`/storybook/`, `/examples/<name>/storybook/`); they do not change, and the existing `?path=` forwarding in `astro.config.mjs` stays.

Changed page URLs (23 of the 28 content pages):

- `/addon/automatic-snapshots/`, `/addon/manual-snapshots/` move under `/addon/guides/`.
- `/addon/install/` becomes `/addon/get-started/`. `/addon/setup/` becomes `/addon/configuration/`, with its CSF Next and monorepo sections split out.
- `/plugin/install/` becomes `/plugin/get-started/`.
- `/guides/reviewing-failures-with-agents/` becomes `/visual-testing/reviewing-failures-with-agents/`. This URL is linked from `llms.txt` of both published npm packages and from the `review-image-snapshot-failures` skill, so it is the most exposed one.
- `/examples/...` pages become `/addon/examples/...`. Caution: `/examples/<name>/storybook/` is also the Storybook path, so the redirect must be exact-match per page and must not catch the Storybook subpaths.
- Everything under `/reference/addon/` and `/reference/plugin/` moves to `/addon/reference/` and `/plugin/reference/`.

Redirects: Starlight/Astro supports a `redirects` map in `astro.config.mjs` that emits a static page with a meta refresh. Generate one entry per moved page from the page map, not by hand. Use the production base through `base`, as the existing script does. Add a check, modeled on `scripts/check-base.mjs`, that fails the build when an old URL listed in the map has no output page. External consumers to update in the same stage: `generate-llms-txt.mjs` (`SITE_PAGES`, regenerate `llms.txt` and per-package copies), package `readme.md` links, the skill files, and `docs/website.md`.

Page-level `llms.txt` links are compiled into published packages, so old URLs must keep working at least until the next release of both packages has been out for a while. Do not remove redirects.

## 5. Staged build plan

Each stage is one pull request (stages 4 to 6 may be several), merges alone, and leaves the site buildable with working links and a passing `pnpm exec turbo run build --filter=website`. Every stage ends with `pnpm docs:llms` if it touches a page named in `SITE_PAGES`. No stage adds a changeset (docs only) unless it edits package source.

**Stage 0. Wait.**
Scope: none. Done when the two remaining Unverified-claims pull requests (plugin matchers, plugin config and setup) have merged. The restructure moves every file they edit; starting earlier guarantees conflicts. #973, #974 and #976 have already merged.

**Stage 1. Sidebar and redirect scaffolding.** Depends on 0.
Scope: `apps/website/astro.config.mjs`, a redirect generator and a redirect check script beside `scripts/check-base.mjs`, `apps/website/turbo.json` if the check needs a task, `docs/website.md`.
Do: replace the autogenerate blocks with one helper that builds the Guides, Configuration and API reference sub-groups for `addon` and `plugin` from a single definition; add the `redirects` map generator (input: the page map in section 3 as data); add a check that every old URL has an output page.
Done when: the built site is identical in content and URLs, the check passes on an empty map and fails on a deliberately missing page, and `docs/website.md` describes both.
Must not touch: any file under `src/content/docs`, the Storybooks group, `scripts/copy-storybook.mjs`.

**Stage 2. Move existing pages.** Depends on 1.
Scope: every row in section 3 marked move, merge or split-by-rename; the redirect data; `generate-llms-txt.mjs` `SITE_PAGES` and the regenerated `llms.txt` files; `readme.md` links in both packages; the skill files that name page URLs; internal links inside pages.
Do: use `git mv` and change only links, frontmatter `sidebar.order`, and the minimum text needed to keep the page valid. Do not trim or rewrite content. Keep `/examples/<name>/storybook/` untouched and make example-page redirects exact-match.
Done when: every old URL in the map redirects to its new page, `scripts/check-base.mjs` passes for production and preview bases, no page links to an old URL, and a rename-aware diff shows moves only.
Must not touch: page prose, the Showcase images, published Storybook paths.

**Stage 3. Visual testing section.** Depends on 2.
Scope: the nine pages under `/visual-testing/` listed in section 3, trimmed duplicate prose in Showcase and the reference pages (replace with links), the landing page's "Which one do I need" text.
Do: write each page from the sources named in section 3. One fact has one home; where a package page repeated a concept, link to the new page. Cite sources for any external claim.
Done when: each page exists with `title`, `description` and a link from at least one package page; no concept is explained in two places; `llms.txt` lists the new pages.
Must not touch: package guides and reference option tables, Compare.

**Stage 4. Addon: split, guides and features.** Depends on 2 (3 for its links; link to the concept page once it exists). Independent of 5.
Scope: `/addon/` only.
Do: split Configuration from the CSF Next and monorepo sections of setup; write Get started, Features, the guides listed in section 2, and the missing reference pages (`visAnnotations`, `storybookVis`, `defineAutoSnapshotParam`, `hasImageSnapshot`, `isSnapshotEnabled`, preset and manager entries). Reference links to the plugin reference for re-exported options.
Done when: the addon tree matches section 2, every addon export that has a public name has a reference page or a stated reason, each Features row links to a guide, and `pnpm docs:llms --gaps` shows fewer undocumented addon exports than before.
Must not touch: `/plugin/`, `/compare/`, Showcase.

**Stage 5. Plugin: parity.** Depends on 2. Independent of 4.
Scope: `/plugin/` only.
Do: write Get started, Features, Examples, Troubleshooting, the guides listed in section 2 (skip masking until Q5 is resolved by an open issue), and the reference pages for `client-api`, `presets/auto`, `presets/manual`, `server-utils`, `testing`. Move the threshold, review image and timeout task examples out of the option reference into guides.
Done when: the plugin tree mirrors the addon's, the `vpv` and `workspace` test cases each have an example page, and the `--gaps` count for the plugin falls.
Must not touch: `/addon/`, `/compare/`.

**Stage 6. Compare.** Depends on 2. Needs the owner's review of every competitor page before merge.
Scope: `/compare/` (overview, vs Vitest visual regression, Playwright, Storybook test-runner with `jest-image-snapshot`, Chromatic, Lost Pixel).
Do: write each page from the tool's current documentation, with a link and a "checked on" date per claim; move the Vitest table out of the plugin install page. One pull request per competitor is allowed. Masking appears only with an open issue to link; otherwise omit the row.
Done when: every claim has a cited source, the overview matrix and the per-tool pages agree, and the owner has approved each page.
Must not touch: package guides, except to replace a comparison with a link.

**Stage 7. Polish and coverage gate.** Depends on 3, 4, 5.
Scope: landing page, Choosing a package, Showcase trim, regenerated `llms.txt`, and a CI check.
Do: make CI fail when a public export has no documentation page (the generator's `--gaps` data), with an allowlist for deliberate exceptions.
Done when: the check runs in the `pull-request` workflow and passes on `main`.
Must not touch: page content beyond links and the landing text.

Stages 3, 4, 5 and 6 may run in parallel after stage 2.

## 6. Decisions

The owner accepted every recommendation on 2026-11-03.

- **Q1. Package sections.** Decided: top-level groups ("Storybook addon", "Vitest plugin"), as in section 2.
- **Q2. Examples.** Decided: under each package (`/addon/examples/`, `/plugin/examples/`). The published Storybooks keep their own group and URLs.
- **Q3. Re-exported options.** Decided: the addon reference links to the plugin reference with a one-line note on each addon page, and does not repeat the options.
- **Q4. Competitors.** Decided: Vitest native visual regression, Playwright, Storybook test-runner with `jest-image-snapshot`, Chromatic, Lost Pixel. Every claim comes from the tool's current documentation with a link and a "checked on" date. The owner reviews each page before merge. Percy is not included.
- **Q5. Masking.** Decided: list it on Compare as "not yet" only if there is an open issue to link; otherwise omit the row. No masking guide until it ships.
- **Q6. Releases.** Decided: keep the name and URL.
- **Q7. Showcase.** Decided: stays at the top level.
- **Q8. Coverage gate.** Decided: add the CI check in stage 7.
- **Q9. Versioning.** Decided: no versioned site. Keep the Migrating pages and add a "supports" table to each Get started page.

## Appendix: what each package can do that the docs under-explain

Addon: automatic snapshots by `snapshot` tag or `auto: true`, per-story opt out, `defineAutoSnapshotParam`; manual snapshots in `play`; themes and viewports; `createMissingBaseline`; Vis panel and compare view; `defineStorybookVis` options (`visProjects`, `snapshotRootDir`, `snapshotSubpath`); Storybook 10.3+ project annotations; CSF Next; CDP access; `hasImageSnapshot`; agent review skill.

Plugin: `vis` plugin options (comparison method, failure thresholds, review image, timeout, `shortenLongSnapshotPaths`, `trimCommonFolder`); `page.toMatchImageSnapshot`, `expect().toMatchImageSnapshot`, `page.hasImageSnapshot`; `presets/auto` and `presets/manual`; `setAutoSnapshotOptions`; `createVis` and the `vis` client setup with themes; `client-api` for building integrations; `server-utils`; `testing` helpers; Playwright and WebdriverIO providers; Vitest workspaces.
