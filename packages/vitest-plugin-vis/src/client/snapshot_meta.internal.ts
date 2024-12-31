type Suite = { meta: any; suite?: Suite | undefined }

export type MetaTask =
	| {
			file?: { meta: any } | undefined
			suite?: Suite | undefined
			meta: any
	  }
	| undefined
