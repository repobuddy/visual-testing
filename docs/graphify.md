# Graphify

[Graphify](https://github.com/Graphify-Labs/graphify) turns a codebase into a knowledge graph that a coding agent can query instead of searching the files.
It parses code locally with tree-sitter, so a code-only graph needs no API key and sends nothing off the machine ([Privacy](https://github.com/Graphify-Labs/graphify#privacy)).

The graph is optional and local.
It is not committed and CI does not build it.

## Requirements

Graphify is a Python CLI.
The PyPI package is `graphifyy` (with two y's) and the command is `graphify`.

You need [uv](https://docs.astral.sh/uv/getting-started/installation/).
The `graph` script runs Graphify through `uvx --from graphifyy==0.9.96`, so you do not install Graphify yourself.
uv downloads that version on the first run and caches it.
To move to a newer version, change the version in the `graph` script in `package.json`.

## Build the graph

```sh
pnpm graph
```

The `graph` script runs two commands:

- `graphify extract . --code-only` parses the code and writes `graphify-out/graph.json`. The `--code-only` flag skips docs and images, which would need an LLM.
- `graphify cluster-only . --no-label` groups the graph into communities and writes `graphify-out/GRAPH_REPORT.md` and `graphify-out/graph.html`. The `--no-label` flag keeps the placeholder community names instead of asking an LLM to name them.

Graphify honors `.gitignore`, so it skips `node_modules`, `dist` and the other ignored folders.
`graphify-out/` is in `.gitignore`.

Run `pnpm graph` again after code changes.
The graph records the commit it was built from in `GRAPH_REPORT.md`.

## Query the graph

The query commands need `graphify` on your `PATH`.
Install the same version as the script ([Installation](https://docs.graphify.com/open-source/installation)):

```sh
uv tool install graphifyy==0.9.96
```

Or put `uvx --from graphifyy==0.9.96` in front of each command.

```sh
graphify query "how does the addon take a snapshot?"
graphify explain "setAutoSnapshotOptions"
graphify path "A" "B"
```

`graphify query`, `graphify path` and `graphify explain` log each call to `~/.cache/graphify-queries.log`.
Set `GRAPHIFY_QUERY_LOG_DISABLE=1` to turn that off ([Privacy](https://github.com/Graphify-Labs/graphify#privacy)).

## Use it from a coding agent

These commands need the installed `graphify`, not `uvx`.
`graphify install` registers the `/graphify` skill with your assistant, in your user profile.
`graphify <platform> install`, for example `graphify claude install`, also makes the assistant consult the graph before it searches the files ([Make your assistant always use the graph](https://github.com/Graphify-Labs/graphify#make-your-assistant-always-use-the-graph)).
Both are per developer, so this repository does not commit their files.
