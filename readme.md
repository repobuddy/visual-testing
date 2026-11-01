# visual-testing

[![Release][release_image]][release_url]

Image snapshot testing for Vitest Browser Mode and Storybook: capture and compare image snapshots automatically and manually.

| Package | What it is for | npm | Docs |
| ------- | -------------- | --- | ---- |
| [`storybook-addon-vis`](packages/storybook-addon-vis) | Capturing and comparing image snapshots of your stories, automatically and manually, from [Storybook Vitest addon][storybook-vitest-addon] tests. | [![npm][addon_npm_image]][addon_npm_url] | [Storybook addon][site_addon] |
| [`vitest-plugin-vis`](packages/vitest-plugin-vis) | Capturing and comparing image snapshots in tests that run in [Vitest Browser Mode][vitest-browser-mode], without Storybook. | [![npm][plugin_npm_image]][plugin_npm_url] | [Vitest plugin][site_plugin] |

## Which one do I need

If you test your stories with Storybook, use `storybook-addon-vis`. It uses `vitest-plugin-vis` internally to do the heavy lifting.
If you do not use Storybook and write tests in Vitest Browser Mode directly, use `vitest-plugin-vis`, which was extracted from the addon to be used directly in Vitest.

![The Primary story in the light theme: a blue pill button labelled Button at the top left of a white 960 by 720 canvas.](testcases/themes/__vis__/linux/__baselines__/component_snapshot.stories.tsx/primary-light.png)

A committed baseline image, one of the snapshots the [showcase][site_showcase] displays.

## Links

- [Documentation website][site]
- [Live Storybook][site_storybook]
- [Showcase][site_showcase]
- [Examples][site_examples]
- [Contributing](contributing.md)

## For AI agents

[`llms.txt`][site_llms] lists the entry points and documentation pages of both packages.
Each package ships a copy as `llms.txt` in its npm package.

[addon_npm_image]: https://img.shields.io/npm/v/storybook-addon-vis.svg?style=flat
[addon_npm_url]: https://www.npmjs.com/package/storybook-addon-vis
[plugin_npm_image]: https://img.shields.io/npm/v/vitest-plugin-vis.svg?style=flat
[plugin_npm_url]: https://www.npmjs.com/package/vitest-plugin-vis
[release_image]: https://github.com/repobuddy/visual-testing/actions/workflows/release.yml/badge.svg
[release_url]: https://github.com/repobuddy/visual-testing/actions/workflows/release.yml
[site]: https://repobuddy.github.io/visual-testing/
[site_addon]: https://repobuddy.github.io/visual-testing/addon/
[site_examples]: https://repobuddy.github.io/visual-testing/examples/
[site_llms]: https://repobuddy.github.io/visual-testing/llms.txt
[site_plugin]: https://repobuddy.github.io/visual-testing/plugin/install/
[site_showcase]: https://repobuddy.github.io/visual-testing/showcase/
[site_storybook]: https://repobuddy.github.io/visual-testing/storybook/
[storybook-vitest-addon]: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
[vitest-browser-mode]: https://vitest.dev/guide/browser/
