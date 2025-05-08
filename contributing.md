# Contributing Guide

## Prerequisites

This repository uses [pnpm].

The best way to get [pnpm] is by enabling [corepack]:

```sh
# install corepack for Node.js before 14.19.0 and 16.9.0 to use pnpm
npm install -g corepack

# enable pnpm with corepack
corepack enable
```

Or you can install [pnpm] directly:

```sh
npm install -g pnpm
```

## Useful Commands

```sh
# build all projects
pnpm build

# run biome check
pnpm check

# build and test all projects
pnpm verify # or pnpm v

# test vitest-plugin-vis in watch mode
pnpm vpv w

# test storybook-addon-vis in watch mode
pnpm sav w
```

## Terminology

> Project

`Project` refers to a single Vitest run on a subject project.
This means if Vitest is running in a workspace, it will be a single run for each project in the workspace.

Examples:

```ts
// vitest.config.ts
// this is a project

export default {
	test: {
		include: ['src/**/*.test.ts'],
		browser: { ... }
	},
}
```

```ts
// vitest.config.ts
export default {
	workspace: [
		// this is a project
		'pkg-a/vitest.config.ts',
		// this is a project
		'pkg-b/vitest.config.ts',
	],
}
```

> Suite

In Vitest v3, a single `project` can be running multiple browser instances.
Each browser instance can run the tests in different browsers,
different viewports, or any specific configuration.

A `suite` is a single run of the tests in a single browser instance.
Each `suite` saves the snapshots in a separate folder,
containing the `__baselines__`, `__results__`, and `__diffs__` folders.

> Module

Each test file has its own lifecycle of `beforeAll`, `beforeEach`, `afterAll`, and `afterEach`.
User can use them to configure visual testing that affects the whole file.
There are also common information for all tests in the file.

The `module` concept compute and share this information between all tests in the file.

> Task

A `task` is a single test execution within a `suite`.
It is identified by `<file path>/[scope]/<test name>`.

[corepack]: https://nodejs.org/api/corepack.html
[pnpm]: https://pnpm.io/
