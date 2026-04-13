---
name: cleanup-cspell-words
description: >-
  Prunes unused Code Spell Checker entries in .vscode/settings.json by running a
  TypeScript maintenance script (not by searching the repo in-chat). Use when the
  user wants to clean cSpell.words, remove stale spell-check ignores, or reduce
  the dictionary list.
---

# Clean up `cSpell.words`

## Goal

Remove entries from `"cSpell.words"` in [`.vscode/settings.json`](../../../.vscode/settings.json) that **do not appear anywhere** in repository file contents (case-insensitive). The settings file itself is **excluded** from the search so words that only exist in that list are dropped.

## Do this (minimize tokens)

**Do not** manually grep the whole repo in the agent. Run the script from **anywhere inside the clone** (it resolves the root with `git rev-parse --show-toplevel`):

```sh
pnpm cleanup:cspell
```

Preview changes without writing:

```sh
pnpm cleanup:cspell -- --dry-run
```

After a write, format if needed:

```sh
pnpm exec biome check --write .vscode/settings.json
```

### Portable execution (no repo devDependency)

The script lives next to this skill: [`cleanup-cspell-words.mts`](cleanup-cspell-words.mts). The `.mts` extension makes Node treat it as ESM without changing the repo’s `package.json` `"type"`.

- **Node ≥22.6** (see root [`package.json`](../../../package.json) `engines.node`): run with built-in type stripping:

```sh
node --experimental-strip-types ./.cursor/skills/cleanup-cspell-words/cleanup-cspell-words.mts
```

- **Older Node or if stripping fails**: one-off runner via npx (no `package.json` entry required):

```sh
npx --yes tsx ./.cursor/skills/cleanup-cspell-words/cleanup-cspell-words.mts
```

Pass `--dry-run` as a normal argument to either command.

## Implementation

- **Repository root**: `git rev-parse --show-toplevel` (fallback: walk upward until `.git` exists). Requires a git working tree.
- **Respecting ignores**: **`rg`** uses repo ignore rules by default. The Node path uses **`git ls-files --cached --others --exclude-standard`** so unignored tracked and untracked files match `.gitignore` / exclude rules. If that fails, it **walks** the tree and skips **single-segment** directory names parsed from `.gitignore` (lines without `*`, `?`, `/`, or `!`) plus `.git`, and skips a few path substrings for patterns the simple parser cannot represent (e.g. `__vis__/local`).

## Rules of thumb

- Re-run when the user trims dead terminology or after large refactors.
- If a word is a **future** or **rare** intentional allowlist entry that is not yet in the tree, the script will remove it — restore it manually or add a real usage first.
