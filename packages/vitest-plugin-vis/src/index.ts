// `vitest-plugin-vis` provides code that can be used in test files.
import './client/expect/augment.ts'
import './client/page/augment.ts'

export { type MetaTask, type SnapshotMeta, setAutoSnapshotOptions } from './client/snapshot_options.ts'
