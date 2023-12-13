export interface BuildPaths {
	entry: string
	output: string
	public: string
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