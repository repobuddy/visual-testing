<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

## Code graph

This repository can build a local [Graphify](https://github.com/Graphify-Labs/graphify) knowledge graph of its code in `graphify-out/`. The graph is not committed. See [docs/graphify.md](docs/graphify.md).

- If `graphify-out/graph.json` is missing or older than your code changes, run `pnpm graph` to build it. It needs [uv](https://docs.astral.sh/uv/), runs locally, and takes a few seconds. If uv is not installed, skip the graph and search the files.
- When `graphify-out/graph.json` exists, run `pnpm --silent graphify query "<question>"` before your first search or source-file read for a codebase question. Read raw files only for lines the graph or an earlier read already located.
- Use `pnpm --silent graphify path "<A>" "<B>"` to see how two things connect and `pnpm --silent graphify explain "<name>"` for one symbol.
- Read `graphify-out/GRAPH_REPORT.md` only for a broad architecture review, or when query, path and explain do not give enough context.
- Put these rules in the prompt of every subagent that explores code.
