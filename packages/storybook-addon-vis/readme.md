# Storybook Vitest Visual Testing addon

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

[![Release][github_release]][github_action_url]

[`storybook-addon-vis`][storybook-addon-vis] captures and compares image snapshot automatically and manually.

This addon is inspired by [`jest-image-snapshot`][jest-image-snapshot].
Internally, it uses [`vitest-plugin-vis`][vitest-plugin-vis] to do the heavy lifting.

Starting from [Storybook] 8.3,
Storybook introduces [Storybook Test addon][storybook-test-addon].

It allows you to test your components directly inside Storybook.
It does this by using a [Vitest plugin][@storybook/experimental-addon-test] to transform your [stories] into [Vitest] tests using [portable stories][portable-stories].

These stories are then run by [Vitest] in the browser using [Vitest Browser Mode][vitest-browser-mode].

Since it is running in an actual browser,
[`jest-image-snapshot`][jest-image-snapshot] does not work as it depends on NodeJS.
This add-on provides similar functionality to [`jest-image-snapshot`][jest-image-snapshot].

In addition, you can capture image snapshot manually,
and controls how the auto image snapshot(s) are taken.

> [!NOTE]
> [storybook-addon-vis] 3.0.0 supports Storybook 10.
>
> [storybook-addon-vis] 2.0.0 supports Storybook 9.
>
> For Storybook 8, please use 1.x.

## Install

```sh
npm install --save-dev storybook-addon-vis

pnpm add --save-dev storybook-addon-vis

yarn add --save-dev storybook-addon-vis
```

Please take a look at the [documentation](https://repobuddy.github.io/visual-testing/?path=/docs/overview--docs) on how to configure and use this addon.

[@storybook/experimental-addon-test]: https://www.npmjs.com/package/@storybook/experimental-addon-test
[downloads_image]: https://img.shields.io/npm/dm/storybook-addon-vis.svg?style=flat
[github_action_url]: https://github.com/repobuddy/storybook-addon-vis/actions
[github_release]: https://github.com/repobuddy/storybook-addon-vis/workflows/release/badge.svg
[jest-image-snapshot]: https://github.com/americanexpress/jest-image-snapshot
[npm_image]: https://img.shields.io/npm/v/storybook-addon-vis.svg?style=flat
[npm_url]: https://npmjs.org/package/storybook-addon-vis
[portable-stories]: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest
[stories]: https://storybook.js.org/docs/writing-stories
[storybook-addon-vis]: https://github.com/repobuddy/storybook-addon-vis
[storybook-test-addon]: https://storybook.js.org/docs/writing-tests/test-addon
[storybook]: https://storybook.js.org
[vitest-browser-mode]: https://vitest.dev/guide/browser/
[vitest-plugin-vis]: https://www.npmjs.com/package/vitest-plugin-vis
[vitest]: https://vitest.dev/
