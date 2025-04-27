import { describe, it } from 'vitest'
import { ctx } from './vis.ctx.ts'
import { vis2 } from './vis2.ts'

describe('vis', () => {
	ctx.mock()

	it('can be called without options', () => {
		vis2()
	})

	// it('enables auto snapshot with auto: true',async()=>{
	// 	render(<div data-testid="subject">hello</div>)
	// 	vis2({
	// 		auto: true
	// 	})
	// })
})
