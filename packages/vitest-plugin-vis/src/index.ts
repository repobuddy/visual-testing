// `vitest-plugin-vis` provides code that can be used in test files.
import './client/expect/augment.ts'
import './client/page/augment.ts'

export { setAutoSnapshotOptions, type MetaTask } from './client/auto_snapshot_options.ts'
export type * from './shared/types.ts'
