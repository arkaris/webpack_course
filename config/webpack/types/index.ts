export interface BuildPaths {
	entry: string
	html: string
	output: string
	pages: string
	components: string
	assets: string
}

export interface WebpackOptions {
	mode: BuildMode
	port: number
	paths: BuildPaths
	analyzer: boolean
	skipTypeCheck: boolean
}