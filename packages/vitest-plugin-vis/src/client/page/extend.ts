import { page } from '@vitest/browser/context'
import { type ImageSnapshotAction, imageSnapshot } from '../image_snapshot.ts'

declare module '@vitest/browser/context' {
	interface BrowserPage extends ImageSnapshotAction {}
}

page.extend({ imageSnapshot })
