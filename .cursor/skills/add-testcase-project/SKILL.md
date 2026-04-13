---
name: add-testcase-project
description: >-
  Adds a new integration testcase package under testcases/ for vitest-plugin-vis
  or storybook-addon-vis in the visual-testing monorepo. Guides discovery
  questions, scaffolding from existing examples, wiring root vitest projects,
  and root package.json script aliases for pnpm filter and vitest --project.
  Use when the user asks to add a testcase, test case project, integration
  fixture, or repro under testcases/.
---

# Add a testcase project (`testcases/`)

## When this applies

Use this workflow when creating a **new private package** under `testcases/` that exercises **`vitest-plugin-vis`** or **`storybook-addon-vis`** in a realistic app-like setup.

## 1. Resolve the target package

If the user did **not** say which package the testcase is for, **stop and ask** (use **AskQuestion** when available):

- **vitest-plugin-vis** — Vitest browser tests using `vis()` from `vitest-plugin-vis/config` (no Storybook, or Storybook not the focus).
- **storybook-addon-vis** — Storybook + `@storybook/addon-vitest` + `storybookVis()` from `storybook-addon-vis/vitest-plugin`.

Do not guess; defaulting is wrong because dependencies and templates differ.

## 2. Discovery questions (ask what is missing)

Gather enough detail to choose a template and name the folder. Ask only what the user has not already provided.

| Topic | Why it matters |
| --- | --- |
| **Objective** | What behavior or regression are we proving? One sentence is enough. |
| **Slug / folder name** | `testcases/<slug>/` — kebab-case, short, descriptive (e.g. `sb-csf-3`, `vpv`). |
| **Minimal vs full** | Smallest repro (few files) vs. closer to a real app (routing, themes, etc.). |
| **Browser runner** | Usually Playwright via `@vitest/browser-playwright` to match other testcases; note if something else is required. |
| **Storybook specifics** (addon path only) | CSF version, addons besides vitest/docs, custom `preview`/`main` needs, port conventions. |
| **Plugin specifics** (vpv path only) | `vis()` options (preset, comparison, thresholds), non-story tests vs story-based, setup file needs. |
| **TypeScript / Vite shape** | Plain Vite+React vs Next vs mixed; align with the closest existing testcase. |
| **Root script prefix** | Short key for root `package.json` aliases (e.g. `sc3`, `tv`, `trv`). Ask if unclear; avoid clashing with existing script names. |

## 3. Pick a template (copy, then adapt)

Prefer **copying an existing testcase** and stripping it down over inventing layout from scratch.

| Target package | Reference testcase | Typical entry config |
| --- | --- | --- |
| `vitest-plugin-vis` | `testcases/vpv` (see also `testcases/multi-instances`) | `vitest.config.ts` with `vis()` plugin |
| `storybook-addon-vis` | `testcases/sb-csf-3` | `vitest.config.ts` with `storybookTest` + `storybookVis`, `.storybook/main.ts` using `defineStorybookVis()` |

Read the reference’s `package.json`, `vitest.config.ts`, and (for Storybook) `.storybook/*` before editing.

### New `package.json` conventions

- `"name"`: `testcase-<slug>` (match sibling pattern, e.g. `testcase-vpv`, `testcase-sb-csf-3`).
- `"private": true`, `"type": "module"`.
- Workspace dependency on the package under test:
  - `"vitest-plugin-vis": "workspace:*"` **or**
  - `"storybook-addon-vis": "workspace:*"`
- Reuse **`catalog:`** entries from siblings for shared devDependencies (`typescript`, `vite`, `vitest`, `@vitest/browser-playwright`, React types, etc.) when applicable.
- Scripts: align with other testcases — at minimum `t:t` (typecheck), `test` / `w` for vitest; add `testcase` / `testcase:u` if mirroring `vpv`.

**Workspace note:** `pnpm-workspace.yaml` already includes `testcases/*` — no change needed there for a new folder.

## 4. Wire the repo so root Vitest sees the project

Add a new entry to the **`projects`** array in the root `vitest.config.ts`:

```ts
'./testcases/<slug>/vitest.config.ts',
```

or, if the testcase uses a merged Vite config (e.g. some apps use `vite.config.ts` as the Vitest config), match the pattern used by the closest sibling (see `testcases/react-vite-ts`).

Keep paths consistent with existing entries (relative to repo root).

## 5. Add root `package.json` aliases

Update the **repository root** `./package.json` `scripts` so the testcase is easy to run without long paths. Follow patterns already used in that file.

### 5.1 `pnpm --filter` shortcut

Add a short script that targets the testcase package by **npm name** (`testcase-<slug>` from the testcase’s `package.json`):

```json
"<prefix>": "pnpm --filter=testcase-<slug>"
```

**Usage:** `pnpm <prefix> test`, `pnpm <prefix> w`, `pnpm <prefix> sb`, etc. — whatever scripts the testcase defines.

Examples in-repo: `sc3` → `testcase-sb-csf-3`, `tv` → `testcase-vpv`, `trv` → `testcase-react-vite-ts`.

### 5.2 Vitest `--project` shortcuts (recommended)

The string passed to `--project` must match the testcase’s **`test.name`** in its Vitest config (e.g. `sb-csf-3`, `testcase-react-vite-ts`, `tv:pw`).

Add **run** and **watch** helpers at the root:

```json
"test:<prefix>": "vitest run --project=<vitest-test-name>",
"w:<prefix>": "vitest --project=<vitest-test-name>"
```

Examples in-repo: `test:sc3` / `w:sc3`, `test:trv` / `w:trv`, `test:mi`.

Pick `<prefix>` so it does not collide with existing script keys. If the user did not specify a prefix, propose one from the slug (short, memorable).

## 6. TypeScript solution references (optional but recommended)

If the new testcase has a `tsconfig.json` with `references` to a package, consider adding the testcase to root `tsconfig.json` → `references` **only if** similar testcases are already listed and the team relies on solution-wide builds for that testcase type.

Examples currently referenced at root: `testcases/vpv`, `testcases/react-vite-ts`, etc. Follow the same pattern when appropriate:

```json
{ "path": "./testcases/<slug>" }
```

## 7. Verify

From the repository root:

```sh
pnpm install
pnpm test:<prefix>
```

Or: `pnpm exec vitest run --project '<vitest test.name>'`. Prefer the new alias once added.

Use the `test.name` in the testcase’s Vitest config (e.g. `sb-csf-3`, `tv:pw`) when filtering. Ensure the new testcase runs and matches the stated objective.

## 8. Keep scope tight

- Do not change production package APIs unless the testcase work explicitly requires it.
- Prefer one clear scenario per new testcase folder unless the user asked for a matrix.
- Match code style and config patterns of the nearest existing testcase.

## Quick checklist

- [ ] Target package confirmed (`vitest-plugin-vis` vs `storybook-addon-vis`).
- [ ] Objective and slug agreed; template chosen.
- [ ] `testcases/<slug>/` created with `package.json` and configs.
- [ ] Root `vitest.config.ts` `projects` includes the new config path.
- [ ] Root `package.json` has `pnpm --filter=testcase-<slug>` alias and `test:<prefix>` / `w:<prefix>` (or documented reason to skip watch).
- [ ] (Optional) Root `tsconfig.json` reference added.
- [ ] `pnpm install` + `pnpm test:<prefix>` (or equivalent) passes.
