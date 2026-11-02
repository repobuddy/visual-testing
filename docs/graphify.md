# Graphify

[Graphify](https://github.com/Graphify-Labs/graphify) turns a codebase into a knowledge graph that a coding agent can query instead of searching the files.
It parses code locally with tree-sitter, so a code-only graph needs no API key and sends nothing off the machine ([Privacy](https://github.com/Graphify-Labs/graphify#privacy)).

The graph is optional and local.
It is not committed and CI does not build it.

## Requirements

Graphify is a Python CLI.
The PyPI package is `graphifyy` (with two y's) and the command is `graphify`.

You need [uv](https://docs.astral.sh/uv/getting-started/installation/).
The `graphify` script in `package.json` runs `uvx --from graphifyy==0.9.96 graphify`, so you do not install Graphify yourself.
uv downloads that version on the first run and caches it.
To move to a newer version, change the version in that script. It is the only place that pins it.

## Build the graph

```sh
pnpm graph
```

The `graph` script runs two commands through the `graphify` script:

- `graphify extract . --code-only` parses the code and writes `graphify-out/graph.json`. The `--code-only` flag skips docs and images, which would need an LLM.
- `graphify cluster-only . --no-label` groups the graph into communities and writes `graphify-out/GRAPH_REPORT.md` and `graphify-out/graph.html`. The `--no-label` flag keeps the placeholder community names instead of asking an LLM to name them.

Graphify honors `.gitignore`, so it skips `node_modules`, `dist` and the other ignored folders.
`graphify-out/` is in `.gitignore`.

Run `pnpm graph` again after code changes.
The graph records the commit it was built from in `GRAPH_REPORT.md`.

## Query the graph

Run the query commands through the `graphify` script.
The `--silent` flag hides the command that pnpm prints first:

```sh
pnpm --silent graphify query "how does the addon take a snapshot?"
pnpm --silent graphify explain "setAutoSnapshotOptions"
pnpm --silent graphify path "A" "B"
```

`graphify query`, `graphify path` and `graphify explain` log each call to `~/.cache/graphify-queries.log`.
Set `GRAPHIFY_QUERY_LOG_DISABLE=1` to turn that off ([Privacy](https://github.com/Graphify-Labs/graphify#privacy)).

## Use it from a coding agent

The [Code graph](../AGENTS.md#code-graph) section of `AGENTS.md` tells coding agents to build the graph with `pnpm graph` and to query it before they search the files.
It is adapted from the block that `graphify <platform> install` writes ([Make your assistant always use the graph](https://github.com/Graphify-Labs/graphify#make-your-assistant-always-use-the-graph)), because that block expects a committed graph and an installed `graphify` command.
If a `graphify <platform> install` adds a `## graphify` section to `AGENTS.md`, do not commit it.

`graphify install` registers the `/graphify` skill with your assistant, in your user profile.
It needs the installed command (`uv tool install graphifyy==0.9.96`, see [Installation](https://docs.graphify.com/open-source/installation)), and it is per developer, so this repository does not commit its files.
