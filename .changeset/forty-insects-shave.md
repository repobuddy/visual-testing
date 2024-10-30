---
"storybook-addon-vis": minor
---

Add `hasSnapshot()`. While this is not a complete solution, it can be used to set up negative tests.
The first time to runs the test, it will create a snapshot and fail. The second time it runs the test, it will compare the snapshot and pass the negative test.
