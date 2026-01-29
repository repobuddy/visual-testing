# setup

Code in this directory is used to setup the plugin in `vitest.setup.ts`.

The code is executed in Vitest browser runner worker.

This worker is running on a headless chrome with `window.name` set to `vitest-iframe`.
