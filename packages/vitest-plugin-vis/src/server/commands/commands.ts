import { hasImageSnapshot } from './has_image_snapshot.ts'
import { imageSnapshotNextIndex } from './image_snapshot_next_index.ts'
import { matchImageSnapshot } from './match_image_snapshot.ts'
import { prepareImageSnapshotComparison } from './prepare_image_snapshot_comparison.ts'
import { preparePageImageSnapshotComparison } from './prepare_page_image_snapshot_comparison.ts'
import { setupVisSuite } from './setup_vis_suite.ts'

export const commands = {
	setupVisSuite,
	imageSnapshotNextIndex,
	hasImageSnapshot,
	matchImageSnapshot,
	preparePageImageSnapshotComparison,
	prepareImageSnapshotComparison,
}
