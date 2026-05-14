---
name: generate-changeset
description: >-
  Generates a changeset file for the visual-testing monorepo by analyzing git
  changes and writing a properly formatted .changeset/*.md entry. Use when the
  user asks to add a changeset, create a changeset, document a release, or
  record a change for storybook-addon-vis or vitest-plugin-vis.
---

# Generate a Changeset

## Publishable packages

Only two packages are published (testcase-* packages are ignored by changeset config):

- `storybook-addon-vis`
- `vitest-plugin-vis`

## Workflow

### 1. Understand the changes

Run `git diff main...HEAD` (or `git diff --staged` if there are only staged changes) to understand what changed. If the user already described the change, use that description.

### 2. Identify affected packages

Map changed files to packages:

| Changed path | Package |
| --- | --- |
| `packages/storybook-addon-vis/**` | `storybook-addon-vis` |
| `packages/vitest-plugin-vis/**` | `vitest-plugin-vis` |
| Both | Both packages |
| `testcases/**`, root config only | No changeset needed (not published) |

If in doubt, ask the user which package(s) are affected.

### 3. Determine bump type

| Change | Bump |
| --- | --- |
| Breaking API change, removed export | `major` |
| New feature, new export, new option | `minor` |
| Bug fix, internal refactor, docs | `patch` |

When unsure, ask the user.

### 4. Write the changeset

Run:

```sh
pnpm changeset
```

Follow the interactive prompts: select packages, choose bump type, write summary.

**Or** create the file manually if you already have all the information — use the format below and skip the CLI.

### Manual format

```markdown
---
"<package-name>": <patch|minor|major>
---

<One or two sentences describing the change from the user's perspective. Focus on what changed and why it matters, not implementation details.>
```

Multiple packages in one changeset:

```markdown
---
"storybook-addon-vis": patch
"vitest-plugin-vis": patch
---

<description>
```

Save the file as `.changeset/<random-slug>.md`. Generate the slug with:

```sh
node -e "const w=['able','bad','big','blue','bold','calm','cold','cool','dark','dear','deep','dull','fast','fine','firm','flat','free','full','good','hard','high','kind','late','lean','live','long','loud','mild','nice','open','pale','pure','quick','rare','real','rich','safe','slow','soft','sure','tall','thin','true','vast','warm','wide','wild','wise','young']; const pick=()=>w[Math.floor(Math.random()*w.length)]; console.log(pick()+'-'+pick()+'-'+pick())"
```

## Examples

**Bug fix in one package:**

```markdown
---
"storybook-addon-vis": patch
---

Fix `defineStorybookVis` returning a `file://` URL instead of a filesystem path.
```

**New feature across both packages:**

```markdown
---
"storybook-addon-vis": minor
"vitest-plugin-vis": minor
---

Add `threshold` option to control pixel-difference tolerance for snapshot comparisons.
```

## Quick checklist

- [ ] Affected package(s) identified (only `storybook-addon-vis` / `vitest-plugin-vis`).
- [ ] Bump type chosen (`patch` / `minor` / `major`).
- [ ] Description is one or two sentences from the user's perspective.
- [ ] File saved under `.changeset/<slug>.md`.
