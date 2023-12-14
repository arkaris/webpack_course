export interface BuildPaths {
	entry: string
	output: string
	public: string
	pages: string
	components: string
}

type BuildMode = "development" | "production"//?

export interface WebpackOptions {
	mode: BuildMode
	port: number
	paths: BuildPaths
	analyzer: boolean
	skipTypeCheck: boolean
}