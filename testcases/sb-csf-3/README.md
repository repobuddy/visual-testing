# Storybook CSF 3 Testcase

This testcase is used to test the Storybook CSF 3 integration.

It spreads `visAnnotations` into `.storybook/preview.tsx` and keeps only `vis.setup()` in `.storybook/vitest.setup.ts`
(no `setProjectAnnotations()` call there).
This is the setup shown in the "Storybook 10.3+ and Vitest project annotations" section of the addon setup docs.
The other testcases keep `setProjectAnnotations([visAnnotations, ...])` in `vitest.setup.ts`.

## Running the Testcase

```bash
pnpm t
```
