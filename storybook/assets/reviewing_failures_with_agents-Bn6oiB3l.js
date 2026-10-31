import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{c as t,s as n}from"./blocks-Bc0ZQNVV.js";import{a as r}from"./chunk-W22LQPXL-BD1iLPSB.js";import{i,r as a}from"./react-DITjJg24.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...i(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{title:`Reviewing Failures with Agents`}),`
`,(0,c.jsx)(t.h1,{id:`reviewing-failures-with-agents`,children:`Reviewing Failures with Agents`}),`
`,(0,c.jsx)(t.p,{children:`When an image snapshot fails, a coding agent often opens the baseline and the result and compares them.
Images are the most expensive input an agent reads.
This page shows what each view costs and the order in which an agent should look.`}),`
`,(0,c.jsx)(t.p,{children:`In short: read the error message, then open the review image instead of the full images.
Open the Actual or Difference image only when the message says the review image was skipped.`}),`
`,(0,c.jsx)(t.h2,{id:`what-a-failure-gives-you`,children:`What a failure gives you`}),`
`,(0,c.jsxs)(t.p,{children:[`A failed `,(0,c.jsx)(t.code,{children:`toMatchImageSnapshot`}),` throws a message like this:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`Snapshot \`button/primary\` mismatched

Expected image to match but was differ by 133 pixels.

Options:    failureThreshold: 0 pixels
            comparisonMethod: pixel

Expected:   ./__vis__/linux/__baselines__/button.stories.tsx/primary.png
Actual:     ./__vis__/linux/__results__/button.stories.tsx/primary.png
Difference: ./__vis__/linux/__diffs__/button.stories.tsx/primary.png
Changed:    1 region: 106x37 at (0,0)
Review:     ./__vis__/linux/__diffs__/button.stories.tsx/primary.review.png (baseline, result, diff of each region)
`})}),`
`,(0,c.jsxs)(t.p,{children:[`When the two images have different sizes, the message also says
`,(0,c.jsx)(t.code,{children:`The image size changed from 1280x720 to 333x720.`})]}),`
`,(0,c.jsx)(t.p,{children:`The message is text and costs little.
It tells the agent how much changed, whether the layout changed size, where each changed region is, and where the images are.`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`Changed:`}),` line lists each changed region as `,(0,c.jsx)(t.code,{children:`<width>x<height> at (<x>,<y>)`}),`.
The plugin finds the changed pixels, grows them by 16 px, and turns each connected area into one region.
Anti-aliasing differences are not counted.`]}),`
`,(0,c.jsx)(t.p,{children:`The review image places, for each region, the Expected crop, the Actual crop, and a diff crop next to each other.
The diff crop shows the baseline in gray at full contrast with the changed pixels in red,
so small text in the changed area stays readable.`}),`
`,(0,c.jsxs)(t.p,{children:[`The review image is skipped when cropping does not help:
the image size changed, there are more than 5 regions, or the regions cover more than half of the image.
The `,(0,c.jsx)(t.code,{children:`Review:`}),` line then says so, and why:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`Review:     skipped, the image size changed; open Actual or Difference instead
`})}),`
`,(0,c.jsxs)(t.p,{children:[`The regions are also written next to the diff, as `,(0,c.jsx)(t.code,{children:`primary.regions.json`}),`:
`,(0,c.jsx)(t.code,{children:`{ "width": 1280, "height": 720, "regions": [{ "x": 0, "y": 0, "width": 106, "height": 37 }] }`}),`.
Tools and UIs read this file to zoom to the changes; an agent gets the same data from the `,(0,c.jsx)(t.code,{children:`Changed:`}),` line.`]}),`
`,(0,c.jsxs)(t.p,{children:[`The Difference image is made by `,(0,c.jsx)(t.a,{href:`https://github.com/mapbox/pixelmatch`,rel:`nofollow`,children:`pixelmatch`}),` with its default colors:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`red pixels are pixels that changed.`}),`
`,(0,c.jsx)(t.li,{children:`yellow pixels are anti-aliasing differences. They do not count toward the failure.`}),`
`,(0,c.jsx)(t.li,{children:`gray is the baseline, faded, for context.`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`The faded baseline makes small text hard to read in the Difference image.
It shows where the change is, not always what it is.`}),`
`,(0,c.jsx)(t.h2,{id:`what-each-view-costs`,children:`What each view costs`}),`
`,(0,c.jsxs)(t.p,{children:[`Claude reads an image in 28 × 28 pixel patches, and each patch is one token:
`,(0,c.jsx)(t.code,{children:`⌈width / 28⌉ × ⌈height / 28⌉`}),`, after the image is scaled down to fit the model's limit
(2576 px on the long edge and 4784 tokens on current models).
See `,(0,c.jsx)(t.a,{href:`https://platform.claude.com/docs/en/build-with-claude/vision`,rel:`nofollow`,children:`Vision`}),` in the Claude docs.
Other models count image tokens differently, but most charge more for larger images.`]}),`
`,(0,c.jsx)(t.p,{children:`For the 1280 × 720 page above, where a 106 × 37 area changed:`}),`
`,(0,c.jsxs)(`table`,{children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`th`,{children:`What the agent opens`}),(0,c.jsx)(`th`,{children:`Image tokens`})]})}),(0,c.jsxs)(`tbody`,{children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Expected and Actual`}),(0,c.jsx)(`td`,{children:`2,392`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Difference only`}),(0,c.jsx)(`td`,{children:`1,196`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Review image (106 × 119)`}),(0,c.jsx)(`td`,{children:`20`})]})]})]}),`
`,(0,c.jsx)(t.p,{children:`The Difference image is the same size as each snapshot, so it always costs half of the pair.
The review image holds only the changed region, three times, so its cost follows the size of the change, not of the page.`}),`
`,(0,c.jsxs)(t.p,{children:[`Across 109 failing comparisons from this repository (see `,(0,c.jsx)(t.a,{href:`#how-this-was-measured`,children:`How this was measured`}),`):`]}),`
`,(0,c.jsxs)(`table`,{children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`th`,{children:`What the agent opens`}),(0,c.jsx)(`th`,{children:`Full pages (66)`}),(0,c.jsx)(`th`,{children:`Components (39)`}),(0,c.jsx)(`th`,{children:`Size changed (4)`})]})}),(0,c.jsxs)(`tbody`,{children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Expected and Actual`}),(0,c.jsx)(`td`,{children:`79,396`}),(0,c.jsx)(`td`,{children:`28,902`}),(0,c.jsx)(`td`,{children:`6,032`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Difference only`}),(0,c.jsx)(`td`,{children:`39,698 (2.0× less)`}),(0,c.jsx)(`td`,{children:`14,451 (2.0× less)`}),(0,c.jsx)(`td`,{children:`4,784 (1.3× less)`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Review image, or the fallback below when it is skipped`}),(0,c.jsx)(`td`,{children:`667 (119× less)`}),(0,c.jsx)(`td`,{children:`350 (83× less)`}),(0,c.jsx)(`td`,{children:`3,016 (2.0× less)`})]})]})]}),`
`,(0,c.jsx)(t.p,{children:`Three things stand out:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`The plugin wrote a review image for 101 of the 109 comparisons: all 66 full pages and 35 of the 39 components.
The largest one costs 20 tokens.`}),`
`,(0,c.jsx)(t.li,{children:`It skipped 4 components because the change covers 84% of an 86 × 36 image.
The agent opens the Difference image instead, which costs 8 tokens each.`}),`
`,(0,c.jsx)(t.li,{children:`It skipped all 4 size changes. The Difference image is padded to the larger image and most of it shows the padding,
so the agent opens only the Actual image.`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`what-the-agent-should-do`,children:`What the agent should do`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`1. Read the error message first.`}),`
It gives the pixel count, any size change, the changed regions, and the image paths.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`2. Open the review image.`}),`
For each region, it shows Expected, Actual, and the changed pixels in red, side by side.
Do not open the full Expected, Actual, or Difference images unless the review image leaves the question open.`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`3. If the message says the review image was skipped, read why.`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`The image size changed: open only the Actual image.
A size change means the layout changed, and the Actual image shows the new layout.`}),`
`,(0,c.jsx)(t.li,{children:`Too many regions, or the regions cover most of the image: open the Difference image.
Note where the red pixels are, then open Expected and Actual only if the Difference image does not show what changed.`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[`4. If there is no `,(0,c.jsx)(t.code,{children:`Review:`}),` line, the review image is turned off (`,(0,c.jsx)(t.code,{children:`reviewImage: false`}),`).`]}),`
The `,(0,c.jsx)(t.code,{children:`Changed:`}),` line still gives each region.
Crop Expected and Actual to those regions with any image tool the environment has, and open the crops,
for example `,(0,c.jsx)(t.code,{children:`magick primary.png -crop 106x37+0+0 +repage primary.crop.png`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`5. Decide what the change is.`}),`
Update the baseline (run the tests with `,(0,c.jsx)(t.code,{children:`-u`}),`) only when the change is what the task intended.
If the content is the same and only the edges of text or shapes differ, it is rendering drift
(fonts, operating system, browser). Report it instead of updating the baseline.
Anything else is a regression to fix or report.`]}),`
`,(0,c.jsx)(t.h2,{id:`add-it-to-your-agent-instructions`,children:`Add it to your agent instructions`}),`
`,(0,c.jsxs)(t.p,{children:[`Paste this into your `,(0,c.jsx)(t.code,{children:`AGENTS.md`}),`, `,(0,c.jsx)(t.code,{children:`CLAUDE.md`}),`, or similar file:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-md`,children:`## Image snapshot failures

When a \`toMatchImageSnapshot\` assertion fails:

1. Read the error message first. It gives the pixel difference, any size change,
   the changed regions (\`Changed:\`), and the image paths.
2. Open the review image (\`Review:\`), not the full images.
   For each region it shows Expected, Actual, and the changed pixels in red.
3. If the message says the review image was skipped:
   - the image size changed: open only the Actual image.
   - otherwise: open the Difference image. Red pixels changed.
     Yellow pixels are anti-aliasing and do not count.
4. Update the baseline (\`-u\`) only when the change is what the task intended.
   Report anything else.
`})}),`
`,(0,c.jsx)(t.h2,{id:`turning-the-review-image-off`,children:`Turning the review image off`}),`
`,(0,c.jsxs)(t.p,{children:[`The review image is on by default.
Set `,(0,c.jsx)(t.code,{children:`reviewImage: false`}),` in `,(0,c.jsx)(t.a,{href:`https://github.com/repobuddy/visual-testing/blob/main/packages/vitest-plugin-vis/src/config/vis.mdx`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`vis()`})}),`
or in a `,(0,c.jsx)(t.code,{children:`toMatchImageSnapshot()`}),` call to not write it.
The regions file and the `,(0,c.jsx)(t.code,{children:`Changed:`}),` line are still written.`]}),`
`,(0,c.jsx)(t.h2,{id:`how-this-was-measured`,children:`How this was measured`}),`
`,(0,c.jsx)(t.p,{children:`The image pairs come from this repository's committed baselines:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`116 tests that have both a `,(0,c.jsx)(t.code,{children:`linux`}),` and a `,(0,c.jsx)(t.code,{children:`win32`}),` baseline.
The Linux image is the baseline and the Windows image is the result.
107 of them differ, mostly in how text is rendered.`]}),`
`,(0,c.jsx)(t.li,{children:`2 baselines that a commit changed in place, where the image size changed.`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`The groups in the table are: size changed, when the two images differ in size;
full pages, 1280 px wide; and components, everything else.`}),`
`,(0,c.jsx)(t.p,{children:`For each pair, the script pads both images to the same size, as this plugin does,
and runs the plugin's own code to compare them with default options,
find the changed regions, decide whether to skip the review image, and build it.
It then computes the token cost of each view with the formula above.
The 9 identical pairs are left out.`}),`
`,(0,c.jsx)(t.p,{children:`To reproduce, run from the repository root:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-sh`,children:`node scripts/measure_diff_tokens.mjs . <out-dir>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`It writes `,(0,c.jsx)(t.code,{children:`results.json`}),` and every image it measured, with the review images and region files, to `,(0,c.jsx)(t.code,{children:`<out-dir>`}),`.
See `,(0,c.jsx)(t.a,{href:`https://github.com/repobuddy/visual-testing/blob/main/scripts/measure_diff_tokens.mjs`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`scripts/measure_diff_tokens.mjs`})}),`.`]}),`
`,(0,c.jsx)(t.p,{children:`Limits of this measurement:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`The token counts are computed from Anthropic's published formula, not read from API usage.`}),`
`,(0,c.jsx)(t.li,{children:`It measures cost, not whether the agent reaches the right decision from each view.`}),`
`,(0,c.jsx)(t.li,{children:`Most of the changes are small text-rendering differences, and every comparison has one changed region.
A change that spreads across a page gives a larger review image, or skips it.`}),`
`]})]})}function s(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),a(),t()})))()}l();export{s as default};